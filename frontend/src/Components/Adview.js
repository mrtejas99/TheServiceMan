import React from 'react';
import { Container, Button, Col, Row, Card, Breadcrumb, Table, Image, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from '../profile.png'

function Adview(){
    const location = useLocation(); //https://stackoverflow.com/a/70742138/10597778

    const logoStyle={
        resizeMode: "cover",
        maxHeight: '8rem',
        maxWidth: '8rem'
    }
    return(
        
            <Container className="py-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Cook</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Goa</Breadcrumb.Item>
                    <Breadcrumb.Item active>Panaji</Breadcrumb.Item>
                </Breadcrumb>
                
                <Row className='py-5'>
                    <Col>
                        <h5>{location.state.title}</h5>
                        <Image styel={{resizeMode: "cover"}} src={location.state.banner_url}/>
                        <h5 >Description</h5>
                        <p>{location.state.description}</p>

                        <h5>Experience</h5>
                        <p>{location.state.experience}</p>
                    </Col>
                   
                    <Col >
                        <h5>Skills</h5>
                        <div className='py-3'>
                            { 
                                location.state.skills.split(",").map((e) => <Badge  className="m-1" bg="secondary">{e}</Badge>)
                            }
                        </div>
                        <h5>User description</h5>
                        <Card style={{ width: '25rem'}} className="my-3">
                            <Row>
                                <Col><Card.Img className='px-3 py-3'variant="top" src={logo} style={logoStyle} /></Col>
                                <Col>
                                <Card.Body>
                                    <Card.Title>Arun Kumar</Card.Title>
                                    <Card.Text>
                                    ★★★☆☆
                                    </Card.Text>
                                    <Button variant="primary" className="btn-sm">Chat</Button>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>

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
                        <Link to="/Sellers" state={{posted_by:location.state.posted_by}}>View more</Link>
                    </Col>
                </Row>

            </Container>

    );
}

export { Adview };
