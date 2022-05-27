import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

function Servicefeedback() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const {t} = useTranslation("common");

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
      }, [user, loading]);

    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">{t('sellerfeedback')}</h2>            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t('sfeedbacklabel')}</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <div className='text-center'>
                <Button variant="primary" >
                    {t('submit')}
                </Button>
            </div>
            
        </Form>
    );
}

export { Servicefeedback };