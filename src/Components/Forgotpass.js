import React from 'react';
import { Form, Button } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

function Forgotpass(){
    const {t} = useTranslation("common");

    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">{t('forgotpass')}</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <div className='text-center'>
                <Button variant="primary" >
                    {t('reset')}
                </Button>
            </div>
        </Form>
    );
}
export { Forgotpass };