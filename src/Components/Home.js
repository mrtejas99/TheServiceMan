import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where, orderBy, limit, startAfter } from "firebase/firestore";

import { Container, Button, Col, Row, Card, Dropdown, ListGroup } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

//Font-awesome
import { RiFilterOffFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
//Constants
import { RESULTS_PER_PAGE, RATING_MASTER, LANGUAGE_MASTER } from "../constants";

//component for filter
function FilterGroup(props) {
    const [filterItems, setFilterItems] = useState([]);
    const filterState = props.currentSelectedFilter;
    const filterDisplayField = props.filterDisplayField || "name";
    const filterByProp = props.filterByProp || props.filterDisplayField || "name";
    const onFilterSelect = props.onFilterSelect;
    const filterData = props.filterData;
    const addSuffix = props.addTextSuffix || false;
    const setFilter = (ev) => {
        ev.preventDefault();
        const filterValue = ev.target.dataset.filter;
        onFilterSelect(filterValue);
    };

    //Map each filter property with an item element
    useEffect(() => {
        setFilterItems(
            <>
                {
                    filterData.map(elem => (
                        <li key={elem[filterByProp]}>
                            {
                                filterState == elem[filterByProp] ? (
                                    <span className="font-weight-bold">{elem[filterDisplayField]}</span>
                                ) : (
                                    <a href="#" className="font-weight-normal" data-filter={elem[filterByProp]} onClick={setFilter}>{elem[filterDisplayField]}</a>
                                )
                            }
                            { addSuffix && elem.suffix && <span>{elem.suffix}</span> }
                        </li>
                    ))
                }
            </>
        );
    }, [filterData, filterState]);

    return (
        <ul className="list-unstyled">
            <li><a href="#" onClick={setFilter} data-filter=""><RiFilterOffFill />&nbsp;{'Clear Filter'}</a></li>
            { filterItems }
        </ul>
    );
}

function Home() {
    const [info , setInfo] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('posted_date');
    const [filterCriteriaCategory, setFilterCriteriaCategory] = useState('');
    const [filterCriteriaGeo, setFilterCriteriaGeo] = useState('');
    const [filterCriteriaStar, setFilterCriteriaStar] = useState('');
    const [filterCriteriaLang, setFilterCriteriaLang] = useState('');

    const [catMaster, setCatMaster] = useState([]);
    const [geoMaster, setGeoMaster] = useState([]);
    const [ratingMaster, setRatingMaster] = useState([]);
    const [langMaster, setLangMaster] = useState([]);

    const [lastDoc, setLastDoc] = useState();   //store the last ad for pagination
    const [loading, setLoading] = useState(true);  //hourglass
    const [isEmpty, setIsEmpty] = useState(false);  //showmore
    // Start the fetch operation as soon as
    // the page loads

    const [queryParams] = useSearchParams();

    const {t} = useTranslation("common");
    const navigate = useNavigate();
    const location = useLocation();

    const search_query = queryParams.get('q') || "";
    const adsRef = collection(db, "serviceads");

    const updateState = (doc) =>{
        const isCollectionEmpty = doc.size == 0;
        if(!isCollectionEmpty){
            doc.forEach(async element => {    
                var data = element.data();
                let rating = await FetchFeedbacks(data.posted_date);   //fetch feedback for each ad
                console.log(`id ${data.posted_date} rating ${rating} typeof rating: ${typeof rating}`); //array containing feedbacks of current ad being processed
                data.rating = rating;
                //console.log(data);
                setInfo(arr => [...arr , data]);
            });

            const lastDoc = doc.docs[doc.docs.length-1];  //the last doc for current fetch
            setLastDoc(lastDoc);
        }
        else
            setIsEmpty(true);
        setLoading(false);  //hide hourglass
    }

    const fetchFilteredAdData = (last_doc) => {
        let q = query(adsRef);

        console.log(search_query);

        if(filterCriteriaCategory != '')
            q = query(q, where('category', "==", filterCriteriaCategory));

        if(filterCriteriaGeo != '')
            q = query(q, where('location', "==", filterCriteriaGeo));

        if(filterCriteriaLang != '')
            q = query(q, where('language', "==", filterCriteriaLang));

        if(filterCriteriaStar != '')
            q = query(q, where('rating', ">=", filterCriteriaStar), orderBy('rating', 'desc'));

        //Sort by criteria
        q = query(q, orderBy(sortCriteria, 'asc'));

        //Fetch after previous result
        if (last_doc !== undefined)
            q = query(q, startAfter(last_doc));

        //Limit results per page
        q = query(q, limit(RESULTS_PER_PAGE));

        //doc = await getDocs(q, orderBy(sortCriteria, 'asc'));
        return getDocs(q);
    };

    const FetchFeedbacks = async (id)=>{
        try {
            const q = query(collection(db, "feedback"), where("adid", "==", id));
            const doc = await getDocs(q);

            let rating_total = doc.docs.reduce((sum, f) => sum + f.data().rating, 0);
            
            return doc.docs.length? rating_total/doc.docs.length : 0;

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching feedbacks");
        }
    }

    useEffect(
        () => {
            fetchFilteredAdData()
            .then(data => {
                setInfo([]);    //clear results of previous filter
                updateState(data); 
                  
            })
            .catch(err => {
                console.error(err);
                alert("An error occured while fetching ads");
            });
        },
        [location, sortCriteria, filterCriteriaCategory, filterCriteriaGeo, filterCriteriaLang, filterCriteriaStar]
    );

    const fetchMore = () => {
        setLoading(true);   //show hourglass

        //Fetch more results, beginning from previous set
        //and then append the new results
        fetchFilteredAdData(lastDoc)
        .then(doc => updateState(doc))
        .catch(err => {
            console.error(err);
            alert("An error occured while fetching paginated ads");
        });
    }

    const getFilterMasterData = (colle, name_field) => (
        getDocs(query(
            collection(db, colle),
            orderBy("popularity", 'desc'),
            orderBy(name_field, 'asc'),
            limit(5)
        ))
        .then(data => data.docs.map(element => element.data()))
    );

    //When home page is mounted
    useEffect(() => {
        //Fetch master data
        getFilterMasterData("adcategories", "category_name")
        .then(categories => setCatMaster(categories))
        .catch(err => console.error(err));
        getFilterMasterData("locations", "city_name")
        .then(locat => setGeoMaster(locat))
        .catch(err => console.error(err));

        //Hard-coded for now
        //Sort 5-star to 1-star
        setRatingMaster([...RATING_MASTER].sort((a, b) => b.value - a.value));
        setLangMaster(LANGUAGE_MASTER);
    }, []);

    return (
        <Container fluid className="py-3">
            <span><b className='me-3'>{t('popularsearches')}</b>{' '}
            <a href="#">{t('cook')}</a> {' '}
            <a href="#">{t('electrician')}</a>{' '}
            <a href="#">{t('plumber')}</a>{' '}
            <a href="#">{t('beautician')}</a>{' '}
            </span>

            <Row className='py-5'>
                <Col sm={2} >
                    <h5>{t('filter')}</h5>
                    
                    <div className='my-3 mx-3'>
                        <h6>{t('category')}</h6>
                        <FilterGroup filterData={catMaster} onFilterSelect={setFilterCriteriaCategory} currentSelectedFilter={filterCriteriaCategory} filterDisplayField="category_name" />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('location')}</h6>
                        <FilterGroup filterData={geoMaster} onFilterSelect={setFilterCriteriaGeo} currentSelectedFilter={filterCriteriaGeo} filterDisplayField="city_name" />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('rating')}</h6>
                        <FilterGroup filterData={ratingMaster} onFilterSelect={setFilterCriteriaStar} currentSelectedFilter={filterCriteriaStar} filterDisplayField="rating_name" filterByProp="value" addTextSuffix />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('language')}</h6>
                        <FilterGroup filterData={langMaster} onFilterSelect={setFilterCriteriaLang} currentSelectedFilter={filterCriteriaLang} filterDisplayField="language_name" filterByProp="value" />
                    </div>
                </Col>

                <Col className="mx-3">
                    {search_query !== '' && <h4>Search Results for &quot;{search_query}&quot;</h4>}
                    <Dropdown className="my-3" onSelect={(e) =>{console.log(e);setSortCriteria(e)}} value={sortCriteria}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" >{t('sort')}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='posted_date'>{t('date')}</Dropdown.Item>
                            <Dropdown.Item eventKey='rating'>{t('rating')}</Dropdown.Item>
                            <Dropdown.Item eventKey='title'>{t('title')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Row xs={2} sm={3} md={4} lg={6} className="g-4">               
                        {
                        info.map((data, idx) => (
                            <Card className="highlight me-3" role="button" key={idx} style={{ width: '15rem' }} onClick={() => navigate(`/Adview/${data.posted_date}`)}>
                                <Card.Img variant="top" src={data.banner_url} />
                                <Card.Body className="zoomtext">
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>
                                    {[...Array(5)].map((x, i)=>{
                                        const ratingValue=i+1;
                                        return (
                                            <label>
                                            <FaStar className="star" color={ratingValue<= (data.rating) ?"#ffc107":"#e4e5e9"}size={15}/>
                                            </label>
                                        );
                                    })}
                                    </Card.Text>
                                    <Card.Text>{data.location}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                        }
                    </Row>
                    <div className="text-center">
                    {loading && <h1>⌛</h1>}
                    {!loading && !isEmpty && <Button className="my-3 w-50" onClick={fetchMore} variant="warning">{t('viewmore')}</Button>}
                    </div>
                    
                </Col>
            </Row>

        </Container>

    );
}

export { Home };
