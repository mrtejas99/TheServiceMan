import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";

import { Container, Button, Col, Row, Card, Dropdown, ListGroup } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

//Font-awesome
import { RiFilterOffFill } from "react-icons/ri";

function FilterGroup(props) {
    const [filterItems, setFilterItems] = useState([]);
    const onFilterSelect = props.onFilterSelect;
    const setFilter = (ev) => {
        ev.preventDefault();
        const filterValue = ev.target.dataset.filter;
        onFilterSelect(filterValue);
    };

    const fData = props.filterData;

    useEffect(() => {
        setFilterItems(<>{fData.map(elem => (
            <li key={elem.name}>
                <a href="#" data-filter={elem.name} onClick={setFilter}>{elem.name}</a>
            </li>
        ))}</>);
    }, [fData])

    return (
        <ul className="list-unstyled">
            <li><a href="#" onClick={setFilter} data-filter=""><RiFilterOffFill />{'Clear Filter'}</a></li>
            { filterItems }
        </ul>
    );
}

function Home() {
    const [info , setInfo] = useState([]);
    const [catMaster, setCatMaster] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('posted_date');
    const [filterCriteriaCategory, setFilterCriteriaCategory] = useState('');
    const [filterCriteriaGeo, setFilterCriteriaGeo] = useState('');
    const [filterStar, setFilterCriteriaStar] = useState('');
    const [filterCriteriaLang, setFilterCriteriaLang] = useState('');

    // Start the fetch operation as soon as
    // the page loads

    const {t} = useTranslation("common");
    const navigate = useNavigate();
    const location = useLocation(); 
    const fetchFilteredAdData = () => new Promise((resolve, reject) => {
        let q = '';

        //Form the ads fetch query with filters

        if(filterCriteriaCategory=='')
            q = query(collection(db, "serviceads"), orderBy(sortCriteria, 'asc'));
            //doc = await getDocs(q, orderBy(sortCriteria, 'asc'));
        else if(filterCriteriaCategory!="")
            q = query(collection(db, "serviceads"), where('category', "==", filterCriteriaCategory), orderBy(sortCriteria, 'asc'));
        else if(filterCriteriaGeo!='')
            q = query(collection(db, "serviceads"), where('location', "==", filterCriteriaGeo), orderBy(sortCriteria, 'asc'));
        else if(filterCriteriaLang!='')
            q = query(collection(db, "serviceads"), where('language', "==", filterCriteriaLang), orderBy(sortCriteria, 'asc'));
        else if(filterStar!='')
            q = query(collection(db, "serviceads"), where('rating', "==", filterStar), orderBy(sortCriteria, 'asc'));
        
        getDocs(q)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });

    useEffect(
        () => {
            fetchFilteredAdData()
            .then(data => {
                setInfo([]);    //clear results of previous filter
                data.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr , data]);
                });
            })
            .catch(err => {
                console.error(err);
                alert("An error occured while fetching ads");
            });
        },
        [location, sortCriteria, filterCriteriaCategory, filterCriteriaGeo, filterCriteriaLang]
    );

    const getFilterMasterData = (colle, name_field) => (
        getDocs(query(
            collection(db, colle),
            orderBy("popularity", 'desc'),
            orderBy(name_field, 'asc')
        ))
        .then(data => data.docs.map(element => element.data()))
        .then(data => data.map(elem => ({"name": elem[name_field]})))
    );

    //When home page is mounted
    useEffect(() => {
        //Fetch master data
        getFilterMasterData("adcategories", "category_name")
        .then(categories => setCatMaster(categories));
    });

    return(
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
                        <FilterGroup filterData={catMaster} onFilterSelect={setFilterCriteriaCategory} />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('location')}</h6>
                        <a onClick={(e)=>{e.preventDefault();console.log(filterCriteriaGeo);setFilterCriteriaGeo('')}} href="#">{t('clearfilter')}</a><br />
                        <a onClick={(e)=>{e.preventDefault();setFilterCriteriaGeo("Panaji")}} href="#">{t('panaji')}</a><br />
                        <a onClick={()=>setFilterCriteriaGeo("Mapusa")} href="#">{t('mapusa')}</a><br />
                        <a onClick={()=>setFilterCriteriaGeo("Margao")} href="#">{t('margao')}</a><br />
                        <a onClick={()=>setFilterCriteriaGeo("Ponda")}  href="#">{t('ponda')}</a><br />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('rating')}</h6>
                        <a onClick={(e)=>{e.preventDefault();console.log(filterStar);setFilterCriteriaStar('')}} href="#">{t('clearfilter')}</a><br />
                        <a onClick={(e)=>{e.preventDefault();setFilterCriteriaStar("5")}} href="#">{t('five')}</a><br />
                        <a onClick={()=>setFilterCriteriaStar("4")} href="#">{t('four')}</a><br />
                        <a onClick={()=>setFilterCriteriaStar("3")} href="#">{t('three')}</a><br />
                        <a onClick={()=>setFilterCriteriaStar("2")}  href="#">{t('two')}</a><br />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('language')}</h6>
                        <a onClick={(e)=>{e.preventDefault();console.log(filterCriteriaLang);setFilterCriteriaGeo('')}} href="#">{t('clearfilter')}</a><br />
                        <a onClick={(e)=>{e.preventDefault();setFilterCriteriaLang("English")}} href="#">{t('english')}</a><br />
                        <a onClick={()=>setFilterCriteriaLang("Marathi")} href="#">{t('marathi')}</a><br />
                        <a onClick={()=>setFilterCriteriaLang("Hindi")} href="#">{t('hindi')}</a><br />
                        <a onClick={()=>setFilterCriteriaLang("Gujarati")}  href="#">{t('gujarati')}</a><br />
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
                        info.map((data) => (
                            <Card style={{ width: '15rem' }} className='me-3'>
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
                </Col>
            </Row>

        </Container>

    );
}

export { Home };
