import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { LogInOutButton } from "./LogInOutButton";
import { FaUser } from "react-icons/fa";

//translate
import { useTranslation } from "react-i18next";

function LoggedIn() {
    const {t} = useTranslation("common");
    return(
        <NavDropdown align="end" title={<FaUser />} id="collasible-nav-dropdown" className='m-3'>
            <NavDropdown.Item href="/Userprofile">{t('profile')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">{t('logout')}</NavDropdown.Item>
        </NavDropdown>
    );
}

export { LoggedIn };

