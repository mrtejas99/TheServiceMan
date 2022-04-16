import React from 'react';
import { Container, Button, Col, Row, Card, Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function Home(){
    return(
        <Container fluidclassName="py-3">
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
                        <Card style={{ width: '15rem' }} className='me-3'>
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

                        <Card style={{ width: '15rem' }} className='me-3'>
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

                        <Card style={{ width: '15rem' }} className='me-3'>
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
                    
                        <Card style={{ width: '15rem' }} className='me-3'>
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

                        <Card style={{ width: '15rem' }} className='me-3'>
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
                    </Row>
                </Col>
            </Row>

        </Container>

    );
}
export { Home };