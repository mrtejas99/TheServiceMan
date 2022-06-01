import React from 'react';
//translate
import { useTranslation } from "react-i18next";

function Footer(){
    const {t} = useTranslation("common");

    return(
        <footer className="footer text-center p-3 border-top">
            <div> © {t('theserviceman')} </div>
        </footer>
    );
}

export { Footer };