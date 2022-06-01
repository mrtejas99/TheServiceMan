import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";

import { Container, Button, Col, Row, Card, Dropdown } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

function Home(){
    const [info , setInfo] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('posted_date');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterGeo, setFilterGeo] = useState('');
    const [filterStar, setFilterStar] = useState('');
    const [filterLang, setFilterLang] = useState('');

    // Start the fetch operation as soon as
    // the page loads

    const {t} = useTranslation("common");
    const navigate = useNavigate();
    const Fetchdata = async ()=>{
        let q = '';
        try {
            if(filterCategory=='')
                q = query(collection(db, "serviceads"), orderBy(sortCriteria, 'asc'));
            if(filterCategory!="")
                q = query(collection(db, "serviceads"), where('category', "==", filterCategory), orderBy(sortCriteria, 'asc'));
            if(filterGeo!='')
                q = query(collection(db, "serviceads"), where('location', "==", filterGeo), orderBy(sortCriteria, 'asc'));
            if(filterLang!='')
                q = query(collection(db, "serviceads"), where('language', "==", filterLang), orderBy(sortCriteria, 'asc'));
            if(filterStar!='')
                q = query(collection(db, "serviceads"), where('rating', "==", filterStar), orderBy(sortCriteria, 'asc'));
            
            const doc = await getDocs(q);
            setInfo([]);    //clear results of previous filter
            doc.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
            });
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching ads");
        }
    }

    useEffect(() => {
        Fetchdata();
    }, [sortCriteria, filterCategory, filterGeo, filterLang ,filterStar]);
    
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
                        <a href="#" onClick={()=>setFilterCategory('')} >{t('clearfilter')}</a><br />
                        <a href="#" onClick={()=>setFilterCategory("Cook")} >{t('cook')}</a><br />
                        <a href="#" onClick={()=>setFilterCategory("Electrician")} >{t('electrician')}</a><br />
                        <a href="#" onClick={()=>setFilterCategory("Plumber")} >{t('plumber')}</a><br />
                        <a href="#" onClick={()=>setFilterCategory("Plumber")} >{t('beautician')}</a><br />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('location')}</h6>
                        <a onClick={()=>setFilterGeo('')} href="#">{t('clearfilter')}</a><br />
                        <a onClick={()=>setFilterGeo("Panaji")} href="#">{t('panaji')}</a><br />
                        <a onClick={()=>setFilterGeo("Mapusa")} href="#">{t('mapusa')}</a><br />
                        <a onClick={()=>setFilterGeo("Margao")} href="#">{t('margao')}</a><br />
                        <a onClick={()=>setFilterGeo("Ponda")}  href="#">{t('ponda')}</a><br />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('rating')}</h6>
                        <a onClick={()=>setFilterStar('')} href="#">{t('clearfilter')}</a><br />
                        <a onClick={()=>setFilterStar("5")} href="#">{t('five')}</a><br />
                        <a onClick={()=>setFilterStar("4")} href="#">{t('four')}</a><br />
                        <a onClick={()=>setFilterStar("3")} href="#">{t('three')}</a><br />
                        <a onClick={()=>setFilterStar("2")}  href="#">{t('two')}</a><br />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('language')}</h6>
                        <a onClick={()=>setFilterLang('')} href="#">{t('clearfilter')}</a><br />
                        <a onClick={()=>setFilterLang("english")} href="#">{t('english')}</a><br />
                        <a onClick={()=>setFilterLang("marathi")} href="#">{t('marathi')}</a><br />
                        <a onClick={()=>setFilterLang("hindi")} href="#">{t('hindi')}</a><br />
                        <a onClick={()=>setFilterLang("gujarati")}  href="#">{t('gujarati')}</a><br />
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
