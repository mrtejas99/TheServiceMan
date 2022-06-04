import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where, orderBy, limit, startAfter } from "firebase/firestore";

import { Container, Button, Col, Row, Card, Dropdown, ListGroup } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

//Font-awesome
import { RiFilterOffFill } from "react-icons/ri";

//Constants
import { RATING_MASTER, LANGUAGE_MASTER } from "../constants";

function FilterGroup(props) {   //component for filter
    const [filterItems, setFilterItems] = useState([]);
    const filterState = props.currentSelectedFilter;
	const filterDisplayField = props.filterDisplayField || "name";
	const filterByProp = props.filterByProp || props.filterDisplayField || "name";
	const onFilterSelect = props.onFilterSelect;
    const filterData = props.filterData;
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
						</li>
					))
				}
			</>
		);
    }, [filterData, filterState]);

    return (
        <ul className="list-unstyled">
            <li><a href="#" onClick={setFilter} data-filter=""><RiFilterOffFill />{'Clear Filter'}</a></li>
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

    const {t} = useTranslation("common");
    const navigate = useNavigate();
    const location = useLocation(); 

    const adsRef = collection(db, "serviceads");

    const updateState = (doc) =>{
        const isCollectionEmpty = doc.size == 0;
        if(!isCollectionEmpty){
            doc.forEach(element => {    
                var data = element.data();
                setInfo(arr => [...arr , data]);
            });

            const lastDoc = doc.docs[doc.docs.length-1];  //the last doc for current fetch
            setLastDoc(lastDoc);
        }
        else
            setIsEmpty(true);
        setLoading(false);  //hide hourglass
    }

    const fetchFilteredAdData = () => new Promise((resolve, reject) => {
        let q = '';
            //doc = await getDocs(q, orderBy(sortCriteria, 'asc'));
        if(filterCriteriaCategory!="")
            q = query(adsRef, where('category', "==", filterCriteriaCategory), orderBy(sortCriteria, 'asc'), limit(5));
        if(filterCriteriaGeo!='')
            q = query(adsRef, where('location', "==", filterCriteriaGeo), orderBy(sortCriteria, 'asc'), limit(5));
        if(filterCriteriaLang!='')
            q = query(adsRef, where('language', "==", filterCriteriaLang), orderBy(sortCriteria, 'asc'), limit(5));
        if(filterCriteriaStar!='')
            q = query(adsRef, where('rating', "==", filterCriteriaStar), orderBy(sortCriteria, 'asc'), limit(5));
        if(filterCriteriaCategory=='' && filterCriteriaGeo=='' && filterCriteriaLang=='' && filterCriteriaStar=='') //initially no filters
             q = query(adsRef, orderBy(sortCriteria, 'asc'), limit(5));
        
        getDocs(q)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });

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
        [location, sortCriteria, filterCriteriaCategory, filterCriteriaGeo, filterCriteriaLang]
    );

    const fetchMore = async () =>{
        setLoading(true);   //show hourglass
        let q = '';
        try{
            if(filterCriteriaCategory=='')
                q = query(adsRef, orderBy(sortCriteria, 'asc'), startAfter(lastDoc), limit(5));
            else if(filterCriteriaCategory!="")
                q = query(adsRef, where('category', "==", filterCriteriaCategory), orderBy(sortCriteria, 'asc'), startAfter(lastDoc), limit(5));
            else if(filterCriteriaGeo!='')
                q = query(adsRef, where('location', "==", filterCriteriaGeo), orderBy(sortCriteria, 'asc'), startAfter(lastDoc), limit(5));
            else if(filterCriteriaLang!='')
                q = query(adsRef, where('language', "==", filterCriteriaLang), orderBy(sortCriteria, 'asc'), startAfter(lastDoc), limit(5));
            else if(filterCriteriaStar!='')
                q = query(adsRef, where('rating', "==", filterCriteriaStar), orderBy(sortCriteria, 'asc'), startAfter(lastDoc), limit(5));
            const doc = await getDocs(q);
            updateState(doc);
        }
        catch (err){
            console.error(err);
            alert("An error occured while fetching paginated ads");
        }
    }
	
	const updateFilterMasterProps = (data, name_field) => data.map(elem => Object.assign(elem, {"name": elem[name_field]}));

    const getFilterMasterData = (colle, name_field) => (
        getDocs(query(
            collection(db, colle),
            orderBy("popularity", 'desc'),
            orderBy(name_field, 'asc')
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
		setRatingMaster(RATING_MASTER);
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
                        <FilterGroup filterData={ratingMaster} onFilterSelect={setFilterCriteriaStar} currentSelectedFilter={filterCriteriaStar} filterDisplayField="rating_name" filterByProp="value" />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('language')}</h6>
						<FilterGroup filterData={langMaster} onFilterSelect={setFilterCriteriaLang} currentSelectedFilter={filterCriteriaLang} filterDisplayField="language_name" filterByProp="value"/>
                    </div>
                </Col>

                <Col className="mx-3">
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
                            <Card key={idx} style={{ width: '15rem' }} className='me-3'>
                                <Card.Img variant="top" src={data.banner_url} />
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>{data.location}</Card.Text>
                                    <Button variant="primary" onClick={() => navigate(`/Adview/${data.posted_date}`)}>{t('viewad')}</Button>
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
