import { Button } from 'react-bootstrap';
import React from 'react';
//translate
import { useTranslation } from "react-i18next";

function Footer() {
    const {t} = useTranslation("common");

    return(
        <footer className="footer p-3 border-top">
            <Button variant="danger" href="mailto://admin@theserviceman.com?subject=Issue regarding TheServiceMan web">{t('Report issue')}</Button>
            <br/>
            <div className="text-center"> © {t('theserviceman')} - <a target='_blank' href="https://github.com/mrtejas99">mrtejas99</a></div>
        </footer>
    );
}

export { Footer };