import React from "react";
import { NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

//translate
import { useTranslation } from "react-i18next";

function LoggedIn() {
    const {t} = useTranslation("common");
    return(
        <NavDropdown align="end" title={<FaUser />} className='mt-3 mb-3'>
            <NavDropdown.ItemText className="text-success">Welcome, user!</NavDropdown.ItemText>
            <NavDropdown.Item href="/Userprofile">{t('profile')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">{t('logout')}</NavDropdown.Item>
        </NavDropdown>
    );
}

export { LoggedIn };

