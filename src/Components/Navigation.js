import React, { useEffect } from "react";

import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { DarkToggle, useDarkMode } from "./DarkMode";

import { LogInOutButton } from "./LogInOutButton";
import { SearchAdsBar } from './SearchAds';
import { NotificationBell } from './NotificationBell';
import { IconContext } from "react-icons";

//translate
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { LANGUAGE_MASTER } from "../constants";

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
        <IconContext.Provider value={{ className: "shared-class", size: 21 }}>
			<Navbar collapseOnSelect expand="lg" bg={navVariant} variant={navVariant} className="sticky-top">
			<Container fluid>
			<Navbar.Brand href="/">{t('theserviceman')}</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="w-75 me-auto">
					<SearchAdsBar />
				</Nav>

				<Nav className='mx-3'>
					<Nav.Item className="d-flex align-items-center">
						<DarkToggle />
					</Nav.Item>
					<Nav.Item className="d-flex align-items-center ml-3">
						<Form.Control as="select" id="lang-translate" className="w-100" defaultValue={localStorage.getItem("i18nextLng")} onChange={(e) =>handleTranslate(e.target.value)}>
							{
								LANGUAGE_MASTER.map(lang => <option value={lang.code}>{lang.language_name}</option>)
							}
						</Form.Control>
					</Nav.Item>
					<Nav.Item className="ml-3 d-flex align-items-center">
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
