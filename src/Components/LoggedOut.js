import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Nav } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

function LoggedOut() {
    const {t} = useTranslation("common");
    const navigate = useNavigate();

    return(
        <Nav.Link className='ml-3' onClick={() => navigate('/login')} >{t('login')}</Nav.Link>
    );
}

export { LoggedOut };
