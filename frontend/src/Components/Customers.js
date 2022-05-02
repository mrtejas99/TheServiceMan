import React from 'react';
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//align-items-center
import 'bootstrap/dist/css/bootstrap.min.css';
function Customers(){
    const username = 'Bob';
    const navigate = useNavigate();

    return(
            <Container className="py-3">
                <h3>Welcome, {username}</h3>
                <p>Cumulative rating: <span>★★★☆☆</span></p>
                <Row> 
                    <Col>
                        <h5>Ads Accessed</h5>
                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")}>View Ad</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='my-4'>
                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")}>View Ad</Button>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")}>View Ad</Button>
                            </Card.Body>
                        </Card>
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
export { Customers };