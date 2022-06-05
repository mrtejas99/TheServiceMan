import React, {  useEffect } from "react";

import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { DarkToggle, useDarkMode } from "./DarkMode";

import { LogInOutButton } from "./LogInOutButton";
import { SearchAdsBar } from './SearchAds';

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
                <SearchAdsBar />
            </Nav>
            <Nav className='mx-3'>
                <Nav.Item className="d-flex align-items-center">
                    <DarkToggle />
                </Nav.Item>
                <select className="m-3 w-50 form-select-sm" value={localStorage.getItem("i18nextLng")} onChange={(e) =>handleTranslate(e.target.value)}>
                    <option value='en'>English</option>
                    <option value='bn'>বাংলা</option>
                    <option value='guj'>ગુજરાતી</option>
                    <option value='hi'>हिन्दी</option>
                    <option value='kn'>ಕನ್ನಡ</option>
                    <option value='kok'>कोंकणी</option>
                    <option value='mr'>मराठी</option>
                    <option value='or'>ଓଡିଆ</option>
                    <option value='ta'>தமிழ்</option>
                    <option value='te'>தெலுங்கு</option>
                </select>
                <LogInOutButton />
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export { Navigation };
