import React  from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

function getPosition(options) {
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}

function onFilterUserLocation() {
    getPosition()
    .then(data => {
        console.log(data.coords);
    });
}

function Navigation(){
    return(
        <Navbar collapseOnSelect expand="lg">
        <Container fluid>
        <Navbar.Brand href="/">TheServiceMan</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto w-75">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <NavDropdown title="Locations" id="collasible-nav-dropdown" className='me-3'>
                <NavDropdown.Item onClick={onFilterUserLocation}>Get current location</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.1">Panaji</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Mapusa</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Ponda</NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex w-100 px-5">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Nav>
            <Nav>
            <Nav.Link href="translate">Translate</Nav.Link>
            <Nav.Link href="/login" >Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export { Navigation };