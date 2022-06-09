import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

//translate
import { useTranslation } from "react-i18next";

import { UserContext } from './UserContext';

function LoggedIn() {
    const {t} = useTranslation("common");
	const [userData, setUserData] = useContext(UserContext);

    return(
        <NavDropdown align="end" title={<FaUser />} className='mt-3 mb-3'>
            <NavDropdown.ItemText className="text-success">{t('welcome')} {userData.display_name}</NavDropdown.ItemText>
            <NavDropdown.Item href="/Userprofile">{t('profile')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">{t('logout')}</NavDropdown.Item>
        </NavDropdown>
    );
}

export { LoggedIn };

