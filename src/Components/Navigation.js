import React, {  useEffect } from "react";

import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LogInOutButton } from "./LogInOutButton";
import { DarkToggle } from "./DarkMode";

import { useDarkMode } from './DarkMode'

//translate
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

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

function Navigation() {
	const [ isDarkMode ] = useDarkMode();
	const navVariant = isDarkMode ? 'dark' : 'light';
   
    const {i18n, t} = useTranslation("common");

    const handleTranslate = (e)=>{
        i18n.changeLanguage(e);
        localStorage.setItem('i18nextLng', e);
    }

     useEffect(()=>{
         if(localStorage.getItem("i18nextLng").length > 3 || localStorage.getItem("i18nextLang"==null)){
            i18next.changeLanguage("en");   //fallback
         }
     },[]);

	return (
        <Navbar collapseOnSelect expand="lg" bg={navVariant} variant={navVariant} className="sticky-top">
        <Container fluid>
        <Navbar.Brand href="/">{t('theserviceman')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className=" w-75 me-auto">
                <NavDropdown title={t('location')} id="collasible-nav-dropdown" className='me-3'>
                    <NavDropdown.Item onClick={onFilterUserLocation}>{t('getcurrentlocation')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.1">{t('panaji')}</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">{t('mapusa')}</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">{t('ponda')}</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">{t('margao')}</NavDropdown.Item>
                </NavDropdown>
                <Form className="d-flex w-100 px-5">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                    />
                    <Button variant="outline-success">{t('search')}</Button>
                </Form>
            </Nav>
            <Nav className='mx-3'>
                <DarkToggle />
                <NavDropdown title={t('translate')} id="collasible-nav-dropdown" onSelect={handleTranslate} value={localStorage.getItem("i18nextLng")}>
                    <NavDropdown.Item eventKey="en">English</NavDropdown.Item>
                    <NavDropdown.Item eventKey="bn">বাংলা</NavDropdown.Item>
                    <NavDropdown.Item eventKey="guj">ગુજરાતી</NavDropdown.Item>
                    <NavDropdown.Item eventKey="hi">हिन्दी</NavDropdown.Item>
                    <NavDropdown.Item eventKey="kn">ಕನ್ನಡ</NavDropdown.Item>
                    <NavDropdown.Item eventKey="kok">कोंकणी</NavDropdown.Item>
                    <NavDropdown.Item eventKey="mr">मराठी</NavDropdown.Item>
                    <NavDropdown.Item eventKey="or">ଓଡିଆ</NavDropdown.Item>
                    <NavDropdown.Item eventKey="ta">தமிழ்</NavDropdown.Item>
                    <NavDropdown.Item eventKey="te">தெலுங்கு</NavDropdown.Item>
                </NavDropdown>
                <LogInOutButton />
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export { Navigation };
