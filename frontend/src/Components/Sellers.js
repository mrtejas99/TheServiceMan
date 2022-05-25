import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

//align-items-center

function Sellers() {
    const navigate = useNavigate();
    const location = useLocation(); //https://stackoverflow.com/a/70742138/10597778

    const [info , setInfo] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    // Start the fetch operation as soon as
    // the page loads
    //window.addEventListener('readystate', () => {
    //    console.log("Loaded");
    //    Fetchdata();
    //});

    

    const Fetchdata = async ()=>{
        try {
            //get ads posted by the seller
            const q1 = query(collection(db, "serviceads"), where("posted_by", "==", location.state.posted_by));
            const doc1 = await getDocs(q1);
            doc1.forEach(element => {
                var data1 = element.data();
                setInfo(arr => [...arr , data1]);
            });

            //get the seller details
            const q2 = query(collection(db, "users"), where("uid", "==", location.state.posted_by));
            const doc2 = await getDocs(q2);
            const data2 = doc2.docs[0].data();
            console.log(data2);
            setFname(data2.fname);
            setLname(data2.lname);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching data");
        }
    }

    useEffect(() => {
        Fetchdata();
    }, [location]);

    return(
            <Container className="py-3">
                <h3>Welcome, {fname} {lname}</h3>
                
                <p>Cumulative rating: <span>★★★☆☆</span></p>
                <Row> 
                    <Col >
                        <h5>Posted Ads</h5>

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
                    
                    <Col>
                        <h5>Feedback</h5>
                        <Card style={{ width: '25rem'}}>
                            <Row>
                                <Col>
                                <Card.Body>
                                    <Card.Title>Arun Kumar</Card.Title>
                                    ★★★☆☆
                                    <Card.Text>
                                    Donec facilisis sem id lacus malesuada, in blandit odio venenatis. 
                                    </Card.Text>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <Card style={{ width: '25rem'}}>
                            <Row>
                                <Col>
                                <Card.Body>
                                    <Card.Title>Arun Kumar</Card.Title>
                                    ★★☆☆☆
                                    <Card.Text>
                                    Donec facilisis sem id lacus malesuada, in blandit odio venenatis. 
                                    </Card.Text>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

            </Container>

    );
}

export { Sellers };
