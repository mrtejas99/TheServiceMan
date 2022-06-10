import React, {  useState, useEffect } from "react";

import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { DarkToggle, useDarkMode } from "./DarkMode";

import { LogInOutButton } from "./LogInOutButton";
import { SearchAdsBar } from './SearchAds';
import { NotificationBell } from './NotificationBell';
import { IconContext } from "react-icons";

//translate
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";

import { useClientSettings } from "./ClientSettings"




function Navigation() {
    const [ isDarkMode ] = useDarkMode();
    const [geoMaster, setGeoMaster] = useState([]);

    const navVariant = isDarkMode ? 'dark' : 'light';
    
    const {i18n, t} = useTranslation("common");

    const [clientSettings, updateClientSetting] = useClientSettings();

    function onFilterUserLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            updateClientSetting({"latitude": position.coords.latitude, "longitude": position.coords.longitude})
        });  
    }

    const handleTranslate = (e)=>{
        i18n.changeLanguage(e);
        localStorage.setItem('i18nextLng', e);
    }

    const getFilterMasterData = (colle, name_field) => (
        getDocs(query(collection(db, colle),))
        .then(data => data.docs.map(element => element.data()))
    );
    
    useEffect(()=>{
        if(localStorage.getItem("i18nextLng").length > 3 || localStorage.getItem("i18nextLang"==null)){
            i18next.changeLanguage("en");   //fallback
        }
        getFilterMasterData("locations", "location_name")
            .then(locat => setGeoMaster(locat))
    },[]);

    return (
        <IconContext.Provider value={{ className: "shared-class", size: 21 }}>
        <Navbar collapseOnSelect expand="lg" bg={navVariant} variant={navVariant} className="sticky-top">
        <Container fluid>
        <Navbar.Brand href="/">{t('theserviceman')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className=" w-75 me-auto">
                <NavDropdown title={t('location')} id="collasible-nav-dropdown" className='me-3'>
                    <NavDropdown.Item key="__userloc" onClick={onFilterUserLocation}>{t('getcurrentlocation')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {
						geoMaster.map((x)=><NavDropdown.Item key={x.location_name} value={x.location_name}>{x.location_name}</NavDropdown.Item>)
                    }
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
                <Nav.Item className="d-flex align-items-center">
                    <NotificationBell />
                </Nav.Item>
                <LogInOutButton />
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </IconContext.Provider>
    );
}

export { Navigation };
