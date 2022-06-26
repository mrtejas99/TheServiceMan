import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

import { Col, Form, Button } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfPassword] = useState('');

    const {t} = useTranslation("common");

    const [user, loading, error] = useAuthState(auth);
    const register = () => {
      if (!fname || !lname) alert("Please enter name");
      if(password != confirmpassword) alert("confirm password should match");
      else registerWithEmailAndPassword(fname, lname, email, password);
    };
    const navigate = useNavigate();
    useEffect(() => {
      if (loading) return;
      if (user) navigate("/Userprofile");
      // eslint-disable-next-line
    }, [user, loading]);

    return(
        <Col className="col-sm-6 text-start text-sm-center mx-sm-auto mx-1 my-5">
        <Form className='mx-auto my-3'>
            <h2 className="text-start text-sm-center fs-1 fs-sm-3">{t('register')} </h2>
            <Form.Group as={Form.Floating} className='mb-2 mb-sm-3' controlId="formBasicfname">
                <Form.Control type="text" placeholder={t('fname')} onChange={(e)=>setFname(e.target.value)}  value={fname}/>
                <Form.Label className="text-secondary">{t('fname')}</Form.Label>
            </Form.Group>

            <Form.Group as={Form.Floating} className='mb-2 mb-sm-3' controlId="formBasiclname">
                <Form.Control type="text" placeholder={t('lname')} onChange={(e)=>setLname(e.target.value)}  value={lname}/>
                <Form.Label className="text-secondary">{t('lname')}</Form.Label>
            </Form.Group>

            <Form.Group as={Form.Floating} className='mb-2 mb-sm-3' controlId="formBasicEmail">
                <Form.Control type="email" placeholder={t('email')} onChange={(e)=>setEmail(e.target.value)} autoComplete="username" value={email}/>
                <Form.Label className="text-secondary">{t('email')}</Form.Label>
            </Form.Group>

            <Form.Group as={Form.Floating} className='mb-2 mb-sm-3' controlId="formBasicPassword">
                <Form.Control type="password" placeholder={t('password')} onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" value={password}/>
                <Form.Label className="text-secondary">{t('password')}</Form.Label>
            </Form.Group>

            <Form.Group as={Form.Floating} className='mb-2 mb-sm-3' controlId="formBasicConfirm">
                <Form.Control type="password" placeholder={t('confirmpass')} onChange={(e)=>setConfPassword(e.target.value)} autoComplete="new-password" value={confirmpassword}/>
                <Form.Label className="text-secondary">{t('confirmpass')}</Form.Label>
            </Form.Group>

            <div className='text-start text-sm-center'>
                <Button variant="primary" onClick={register}>
                    {t('register')}
                </Button>
                <div className='my-3'>{t('alreadymember?')} ? <Link to="/login">{t('login')}</Link> </div>
                <hr></hr>
                <Button variant="light" onClick={signInWithGoogle}>
                    {t('googleregister')}
                </Button>
            </div>
        </Form>
        </Col>
    );
}

export { Register };
