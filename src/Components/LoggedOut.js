import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

function LoggedOut() {
    const {t} = useTranslation("common");
    return(
        <Nav.Link href='/login' >{t('login')}</Nav.Link>
    );
}

export { LoggedOut };
