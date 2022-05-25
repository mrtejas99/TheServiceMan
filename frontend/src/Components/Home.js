import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { Container, Button, Col, Row, Card, Dropdown } from "react-bootstrap";

function Home(){
    const [info , setInfo] = useState([]);
    // Start the fetch operation as soon as
    // the page loads

    const navigate = useNavigate();
    const location = useLocation(); 
    const Fetchdata = async ()=>{
        try {
            const q = query(collection(db, "serviceads"));
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

    useEffect(() => {
        Fetchdata();
    }, [location]);
    
    return(
        <Container fluidclass Name="py-3">
            <span><b className='me-3'>Popular searches</b>{' '}
            <a href="#">Cook</a> {' '}
            <a href="#">Electrician</a>{' '}
            <a href="#">Plumber</a>{' '}
            <a href="#">Beautician</a>{' '}
            </span>
            
            <Row className='py-5'>
                <Col xs={2}>
                    <h5>Filter</h5>
                    <div className='my-3 mx-3'>
                        <h6>Category</h6>
                        <a href="#">Cook</a><br />
                        <a href="#">Electrician</a><br />
                        <a href="#">Plumber</a><br />
                        <a href="#">Beautician</a><br />
                    </div>
                    <div className='my-3 mx-3'>
                        <h6>Location</h6>
                        <a href="#">Panaji</a><br />
                        <a href="#">Mapusa</a><br />
                        <a href="#">Margao</a><br />
                        <a href="#">Ponda</a><br />
                    </div>

                </Col>

                <Col>
                    <Dropdown className="my-3">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                            Sort
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Rating</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Price &uarr;	</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Price &darr;	</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Row xs={1} md={2} lg={4} className="g-4">               
                        {
                        info.map((data) => (
                            <Card style={{ width: '15rem' }} className='me-3'>
                                <Card.Img variant="top" src={data.banner_url} />
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>{data.location}</Card.Text>
                                    <Button variant="primary" onClick={() => navigate("/Adview", {state:{title:data.title, banner_url:data.banner_url, description: data.description, experience: data.experience, skills:data.skills, language: data.language, category: data.category, location: data.location, posted_by: data.posted_by}})}>View Ad</Button>
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
