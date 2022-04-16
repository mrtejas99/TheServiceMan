import React from 'react';
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
//align-items-center
import 'bootstrap/dist/css/bootstrap.min.css';
function Userprofile(){
    const username = 'Bob';
    return(
            <Container className="py-3">
                <h3>Welcome, {username}</h3>
                <Row> 
                    <Col>
                        <h5>Profile</h5>
                        <Form className='d-flex py-1'>
                            <Form.Control type="text" value={'contact'} className="mr-sm-2" />
                            <Button variant="outline-success">&#128393;</Button>
                        </Form>
                            
                        <Form className='d-flex py-1'>
                            <Form.Control type="text" value={'password'} className="mr-sm-2" />
                            <Button variant="outline-success">&#128393;</Button>
                        </Form>
                    </Col>
                    <Col>
                        <Button variant="info" href="/createad">Advertise on platform</Button>
                    </Col>
                </Row>
                
                <Row className='py-5'>
                    <Col>
                        <h5>Your ads</h5>
                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" href="/Adview">View Ad</Button>
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
                                <Button variant="primary" href="/Adview">View Ad</Button>
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
                                <Button variant="primary" href="/Adview">View Ad</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <h5>Last viewed ads</h5>
                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" href="/Adview">View Ad</Button>
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
                                <Button variant="primary" href="/Adview">View Ad</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>

    );
}
export { Userprofile };