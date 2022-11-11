import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

//translate
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'

import { UserContext } from './UserContext';

function LoggedIn() {
    const {t} = useTranslation("common");
	const { userData } = useContext(UserContext);
    const navigate = useNavigate();


    return(
        <NavDropdown align="end" title={<FaUser />} className='ml-3'>
            <NavDropdown.ItemText className="text-success">{t('welcome')} {userData.display_name}</NavDropdown.ItemText>
            <NavDropdown.Item onClick={() => navigate('/Userprofile')} >{t('profile')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate('/logout')}>{t('logout')}</NavDropdown.Item>
        </NavDropdown>
    );
}

export { LoggedIn };

