import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where, orderBy, limit, startAfter, startAt, endAt } from "firebase/firestore";
import { getFilterMasterData, matchGeoHashAds } from '../datautils';

import { Container, Button, Col, Row, Card, Dropdown } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

//Icons from React-icons and Font-awesome
import { RiFilterOffFill, RiMapPin2Line, RiCheckboxCircleLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
//Constants
import { RESULTS_PER_PAGE, RATING_MASTER, LANGUAGE_MASTER } from "../constants";

//geoloc
import { ClientSettingsContext } from "./ClientSettings";
const geofire = require('geofire-common');

//Component to render a filter group - list of filters
function FilterGroup(props) {
    const [filterItems, setFilterItems] = useState([]);
    const filterState = props.currentSelectedFilter;
    const filterDisplayField = props.filterDisplayField || "name";
    const filterByProp = props.filterByProp || props.filterDisplayField || "name";
    const onFilterSelect = props.onFilterSelect;
    const filterData = props.filterData;
    const addSuffix = props.addTextSuffix || false;
    const translatePrefix = props.translatePrefix || false;

    const { t } = useTranslation("common");

    //Map each filter property with an item element
    useEffect(() => {
        setFilterItems(
            <>
                {
                    filterData.map(elem => (
                        <li key={elem[filterByProp]}>
                            {
                                filterState === elem[filterByProp] ? (
                                    <span className="font-weight-bold">{t(elem[filterDisplayField])}</span>
                                ) : (
                                    <a href="#" className="font-weight-normal" onClick={e => { e.preventDefault(); onFilterSelect(elem[filterByProp]); }}>{t(elem[filterDisplayField])}</a>
                                )
                            }
                            {addSuffix && elem.suffix && <span>&nbsp;{translatePrefix ? t(elem.suffix) : elem.suffix}</span>}
                        </li>
                    ))
                }
            </>
        );
    }, [filterData, filterState, t]);

    return (
        <ul className="list-unstyled list-group">
            <li><a href="#" onClick={e => { e.preventDefault(); onFilterSelect(''); }}><RiFilterOffFill />&nbsp;{t('Clear Filter')}</a></li>
            {filterItems}
        </ul>
    );
}

function useGeoStatus() {
    const [geoFilterStatus, setGeoFilterStatus] = useState({active: false, acquired: false});
    const setIsActive = value => setGeoFilterStatus(Object.assign(Object.assign({}, geoFilterStatus), {active: value}));
    const setIsAcquired = value => setGeoFilterStatus(Object.assign(Object.assign({}, geoFilterStatus), {acquired: value}));
    const isOperational = () => geoFilterStatus.active && geoFilterStatus.acquired;
    return [geoFilterStatus, setIsActive, setIsAcquired, isOperational];
}

function Home() {
    //List of ads loaded
    const [info, setInfo] = useState([]);

    //Sort-by parameter
    const [sortCriteria, setSortCriteria] = useState('');

    //Filtering modes
    const [filterCriteriaCategory, setFilterCriteriaCategory] = useState('');
    const [filterCriteriaGeo, setFilterCriteriaGeo] = useState('');
    const [filterCriteriaStar, setFilterCriteriaStar] = useState(0);
    const [filterCriteriaLang, setFilterCriteriaLang] = useState('');

    //Dataset of various master collections
    const [catMaster, setCatMaster] = useState([]);
    const [geoMaster, setGeoMaster] = useState([]);
    const [ratingMaster, setRatingMaster] = useState([]);
    const [langMaster, setLangMaster] = useState([]);

    //Pagination
    const [lastDoc, setLastDoc] = useState();   //store the last ad for pagination
    const [loading, setLoading] = useState(true);  //hourglass
    const [isEmpty, setIsEmpty] = useState(false);  //showmore

    //Geo-location of the user
    const [clientLocationCentre, setCientLocationCenter] = useState(null); //for geo location
    const [geoFilterStatus, setGeoFilterIsActive, setGeoIsAcquired, isGeoFilterOperational] = useGeoStatus();

    //Query string (for example: Search results query)
    const [queryParams] = useSearchParams();

    //Client settings
    const [clientSettings, updateClientSetting] = useContext(ClientSettingsContext);

    //Translation
    const { t } = useTranslation("common");

    //Page router navigation
    const navigate = useNavigate();
    const location = useLocation();

    const search_query = queryParams.get('q') || "";
    //Reference to all ads collection
    const adsRef = collection(db, "serviceads");

    const updateState = (doc) => {
        const isCollectionEmpty = doc.size === 0;
        if (!isCollectionEmpty) {
            setInfo(arr => [...arr, ...doc.docs.map(x => x.data())]);
            const lastDoc = doc.docs[doc.docs.length - 1];  //the last doc for current fetch
            setLastDoc(lastDoc);
        }
        else
            setIsEmpty(true);
        setLoading(false);  //hide hourglass
    }

    useEffect(() => {
        if (clientSettings.latitude && clientSettings.longitude)
            setCientLocationCenter([clientSettings.latitude, clientSettings.longitude])
    }, [clientSettings])

    function queryHashes() {
        if (clientLocationCentre === null) return;
        // [START fs_geo_query_hashes]
        // Find cities within 50km of current location
        const radiusInM = 50 * 1e3;

        // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
        // a separate query for each pair. There can be up to 9 pairs of bounds
        // depending on overlap, but in most cases there are 4.
        const bounds = geofire.geohashQueryBounds(clientLocationCentre, radiusInM);
        const promises = [];
        for (const b of bounds) {
            const q = query(adsRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]));
            promises.push(getDocs(q));
        }

        // Collect all the query results together into a single list
        Promise.all(promises)
        .then(snapshots => matchGeoHashAds(snapshots, clientLocationCentre, radiusInM))
        .then(matchingDocs => {
            matchingDocs.forEach(async element => {
                var data = element.data();
                console.log(data)
                setInfo(arr => [...arr, data]);
            })
            // Process the matching documents
            // [START_EXCLUDE]
            // [END_EXCLUDE]
        })
        .catch(err => {
            console.error(err);
            alert(t('errgeoloc'));
        });
        // [END fs_geo_query_hashes]
    }

    const fetchFilteredAdData = (last_doc) => {
        console.log(` cate:${filterCriteriaCategory} geo: ${filterCriteriaGeo} lang:${filterCriteriaLang} star:${filterCriteriaStar} ${typeof filterCriteriaStar}`)
        let q = query(adsRef);

        //Search query
        if (search_query !== '') {
            //Filter using title
            //console.log(search_query);
            //q = query(q, orderBy("title","asc"), startAt(search_query), endAt(search_query+"\uf8ff"));
            q = query(q, where('category', "==", search_query));
        }

        if (filterCriteriaCategory != '')
            q = query(q, where('category', "==", filterCriteriaCategory));

        if (filterCriteriaGeo != '')
            q = query(q, where('location', "==", filterCriteriaGeo));

        if (filterCriteriaLang != '')
            q = query(q, where('language', "==", filterCriteriaLang));
        if (filterCriteriaStar != '')
            q = query(q, where('average', ">=", filterCriteriaStar));

        //for querying using geohash
        // if(Object.keys(range).length != 0){
        //     console.log(range);
        //     //something wrong here but condition correct
        //     q = query(q, where("geohash", ">=", range.lower), where("geohash", "<=", range.upper), orderBy('geohash', 'desc'));
        // }

        //Sort by criteria
        if (sortCriteria == "posted_date" || sortCriteria == "average")
            q = query(q, orderBy(sortCriteria, 'desc'));
        if (sortCriteria == "title")
            q = query(q, orderBy(sortCriteria, 'asc'));

        //Fetch after previous result
        if (last_doc !== undefined)
            q = query(q, startAfter(last_doc));

        //Limit results per page
        q = query(q, limit(RESULTS_PER_PAGE));

        //doc = await getDocs(q, orderBy(sortCriteria, 'asc'));
        return getDocs(q);
    };

    //Proimise wrapper for Geo Location
    const getNavGeolocation = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

    const acquireUserLocation = () => {
        return getNavGeolocation()
        .then(position => updateClientSetting(
            { "cli_latitude": position.coords.latitude, "cli_longitude": position.coords.longitude }
        ));
    };

    //Geo-location acquisition
    useEffect(() => {
        if (geoFilterStatus.active && !geoFilterStatus.acquired) {
            acquireUserLocation()
            .then(() => setGeoIsAcquired(true))
            .catch(() => {
                setGeoIsAcquired(false);
                setGeoFilterIsActive(false);
                //Failed to acquire your location 
                window.alert(t("errlocfetch"));
            });
        }
    }, [geoFilterStatus]);


    useEffect(
        () => {
            fetchFilteredAdData()
                .then(data => {
                    setInfo([]);    //clear results of previous filter
                    updateState(data);
                    //queryHashes();
                })
                .catch(err => {
                    console.error(err);
                    alert(t("errfetchad"));
                });
        },
        [
            location,
            sortCriteria,
            filterCriteriaCategory,
            filterCriteriaGeo,
            filterCriteriaLang,
            filterCriteriaStar,
            isGeoFilterOperational()
        ]
    );

    const fetchMore = () => {
        setLoading(true);   //show hourglass

        //Fetch more results, beginning from previous set
        //and then append the new results
        fetchFilteredAdData(lastDoc)
            .then(doc => updateState(doc))
            .catch(err => {
                console.error(err);
                alert(t("errfetchad")); //paginated
            });
    }

    //When home page is mounted
    useEffect(() => {
        //Fetch master data
        getFilterMasterData("adcategories", "category_name")
            .then(categories => setCatMaster(categories))
            .catch(err => console.error(err));
        getFilterMasterData("locations", "location_name")
            .then(locat => setGeoMaster(locat))
            .catch(err => console.error(err));

        //Hard-coded for now
        //Sort 5-star to 1-star
        setRatingMaster([...RATING_MASTER].sort((a, b) => b.value - a.value));
        setLangMaster(LANGUAGE_MASTER);
    }, []);

    //Lazy to do this in JSX, so a wrapper it is!
    const geoStatusToStyle = () =>
        geoFilterStatus.active ? (geoFilterStatus.acquired ? "text-danger font-weight-bold" : "text-dark") : "";

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

					<a href="#" onClick={e=>setGeoFilterIsActive(!geoFilterStatus.active)} className={geoStatusToStyle()}>{isGeoFilterOperational() ? <RiCheckboxCircleLine /> : <RiMapPin2Line />}&nbsp;{t('usecurrentlocation')}{(geoFilterStatus.active && !geoFilterStatus.acquired) ? "..." : ""}</a>

                    <div className='my-3 mx-3'>
                        <h6>{t('category')}</h6>
                        <FilterGroup filterData={catMaster} onFilterSelect={setFilterCriteriaCategory} currentSelectedFilter={filterCriteriaCategory} filterDisplayField="category_name" />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('location')}</h6>
                        <FilterGroup filterData={geoMaster} onFilterSelect={setFilterCriteriaGeo} currentSelectedFilter={filterCriteriaGeo} filterDisplayField="location_name" />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('rating')}</h6>
                        <FilterGroup filterData={ratingMaster} onFilterSelect={setFilterCriteriaStar} currentSelectedFilter={filterCriteriaStar} filterDisplayField="rating_name" filterByProp="value" addTextSuffix translatePrefix />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('language')}</h6>
                        <FilterGroup filterData={langMaster} onFilterSelect={setFilterCriteriaLang} currentSelectedFilter={filterCriteriaLang} filterDisplayField="language_name" filterByProp="value" />
                    </div>
                </Col>

                <Col className="mx-3">
                    {isGeoFilterOperational() && <span className="text-warning">{t('Note: Viewing nearby results only')}</span>}
                    {search_query !== '' && <h4>{t('Search Results for')} &quot;{search_query}&quot;</h4>}
                    <Dropdown className="my-3" onSelect={(e) => setSortCriteria(e)} value={sortCriteria}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" >{t('sort')}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='posted_date'>{t('date')}</Dropdown.Item>
                            <Dropdown.Item eventKey='average'>{t('rating')}</Dropdown.Item>
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
                                            {[...Array(5)].map((x, i) => {
                                                const ratingValue = i + 1;
                                                return (
                                                    <label>
                                                        <FaStar className="star" color={ratingValue <= (data.rating / data.feedback_count) ? "#ffc107" : "#e4e5e9"} size={15} />
                                                    </label>
                                                );
                                            })}
                                        </Card.Text>
                                        <Card.Text>{t(data.location)}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </Row>
                    <div className="text-center">
                        {loading && <h1>⌛</h1>}
                        {!loading && !isEmpty && <Button className="my-3 w-50" onClick={fetchMore} variant="warning">{t("viewmore")}</Button>}
                        {!loading && (info.length === 0) && <span>{t("No results found")}</span>}
                    </div>

                </Col>
            </Row>

        </Container>

    );
}

export { Home };
