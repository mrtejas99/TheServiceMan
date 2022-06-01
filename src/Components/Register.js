import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

import { Form, Button } from "react-bootstrap";
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
        <Form className='w-50 mx-auto my-5 px-3'>
            <h2 className="text-center">{t('register')} </h2>
            <Form.Group className="mb-3" controlId="formBasicfname">
                <Form.Label>{t('fname')}</Form.Label>
                <Form.Control type="text" placeholder={t('fname')} onChange={(e)=>setFname(e.target.value)}  value={fname}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasiclname">
                <Form.Label>{t('lname')}</Form.Label>
                <Form.Control type="text" placeholder={t('lname')} onChange={(e)=>setLname(e.target.value)}  value={lname}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control type="email" placeholder={t('email')} onChange={(e)=>setEmail(e.target.value)}  value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control type="password" placeholder={t('password')} onChange={(e)=>setPassword(e.target.value)}  value={password}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirm">
                <Form.Label>{t('confirmpass')}</Form.Label>
                <Form.Control type="password" placeholder={t('confirmpass')} onChange={(e)=>setConfPassword(e.target.value)}  value={confirmpassword}/>
            </Form.Group>

            <div className='text-center'>
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
    );
}

export { Register };
