import React from 'react';
//translate
import { useTranslation } from "react-i18next";

function Error(){
    const {t} = useTranslation("common");

    return(
        <div className="page-wrap d-flex flex-col vh-100 align-items-center">
            <div className="container">
                <div class="row justify-content-center" style={{paddingTop:"20%"}}>
                    <div class="col-md-12 text-center">
                        <span class="display-1 d-block">404</span>
                        <div class="mb-4 lead">{t('errmsg404')}</div>
                        <a href="/" >{t('backtohome')}</a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export { Error };
