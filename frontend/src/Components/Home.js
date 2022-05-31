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
    const [filterCriteria, setFilterCriteria] = useState('');
    // Start the fetch operation as soon as
    // the page loads

    const {t} = useTranslation("common");
    const navigate = useNavigate();
    const location = useLocation(); 
    const Fetchdata = async ()=>{
        let q = '';
        try {
            if(filterCriteria=='')
                q = query(collection(db, "serviceads"), orderBy(sortCriteria, 'desc'));
               //doc = await getDocs(q, orderBy(sortCriteria, 'asc'));
            else
               q = query(collection(db, "serviceads"), where('category', "==", filterCriteria), orderBy(sortCriteria, 'asc'));
            
            const doc = await getDocs(q);
            doc.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
            });
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching ads");
        }
    }

    const filterCategory = (e)=> {
        e.preventDefault();
        let category = e.target.id;
        console.log(category);
        setFilterCriteria(category);
    }

    useEffect(() => {
        Fetchdata();
    }, [location, sortCriteria, filterCriteria]);
    
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
                        <a href="#" onClick={filterCategory} id="Cook" >{t('cook')}</a><br />
                        <a href="#" onClick={filterCategory} id="Electrician" >{t('electrician')}</a><br />
                        <a href="#" onClick={filterCategory} id="Plumber" >{t('plumber')}</a><br />
                        <a href="#" onClick={filterCategory} id="Beautician" >{t('beautician')}</a><br />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>{t('location')}</h6>
                        <a href="#">{t('panaji')}</a><br />
                        <a href="#">{t('mapusa')}</a><br />
                        <a href="#">{t('margao')}</a><br />
                        <a href="#">{t('ponda')}</a><br />
                    </div>

                </Col>

                <Col className="mx-3">
                    <Dropdown className="my-3" onSelect={(e) =>setSortCriteria(e)} value={sortCriteria}>
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
                                    <Button variant="primary" onClick={() => navigate("/Adview", {state:{title:data.title, banner_url:data.banner_url, description: data.description, experience: data.experience, skills:data.skills, language: data.language, category: data.category, location: data.location, posted_by: data.posted_by}})}>{t('viewad')}</Button>
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
