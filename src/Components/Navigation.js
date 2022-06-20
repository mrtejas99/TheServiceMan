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
			<Navbar collapseOnSelect expand="sm" bg={navVariant} variant={navVariant} className="sticky-top">
			<Container fluid>
			<Navbar.Brand href="/">{t('theserviceman')}</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse>
				<Nav className="w-100 mx-auto me-auto d-flex align-items-center">
					<SearchAdsBar />
				</Nav>
				<Nav className="w-100 mx-auto me-auto mt-3 mt-sm-0 d-flex align-items-center justify-content-sm-end flex-row">
					<Nav.Item className="ml-3">
						<DarkToggle />
					</Nav.Item>
					<Nav.Item className="ml-3">
						<Form.Select defaultValue={localStorage.getItem("i18nextLng")} onChange={(e) =>handleTranslate(e.target.value)}>
						{
							LANGUAGE_MASTER.map(lang => <option value={lang.code}>{lang.language_name}</option>)
						}
						</Form.Select>
					</Nav.Item>
					<Nav.Item className="ml-3">
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
