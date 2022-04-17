import React from 'react';
import { Container,  Col, Row, Button, Form, Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function Adcreate(){
    return(
        <Container className="py-3"> 
            <Form className='my-5 px-3' >    
            <Row className='py-5'>
                <h2 className="text-center">Create Ad </h2>  
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="title" />
                    </Form.Group>

                    <Form.Group controlId="formImg" className="mb-3">
                        <Form.Label>Banner</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExperience">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicSkills">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Dropdown className="my-3">
                        <Dropdown.Toggle variant="secondary" id="dropdown-loc" >
                            Location
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Panaji</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Margao</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Mapusa</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Ponda</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="my-3">
                        <Dropdown.Toggle variant="secondary" id="dropdown-lang" >
                            Language
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Hindi</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Marathi</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="my-3">
                        <Dropdown.Toggle variant="secondary" id="dropdown-category" >
                            Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Cook</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Electrician</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Plumber</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Beautician</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className='text-center'>
                        <Button variant="primary" className="w-50 m-auto" type="submit">Create Ad</Button>
                    </div>
                </Col>
            </Row>
            </Form>
        </Container>

    );
}
export { Adcreate };

