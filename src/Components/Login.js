
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Col, Form, Button } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const {t} = useTranslation("common");

    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) 
            navigate("/Userprofile");
    }, [user, loading]);
    
    return (
        <Col className="col-sm-6 text-start text-sm-center mx-sm-auto mx-1 my-5">
        <Form className='mx-auto my-3' onSubmit={e => {e.preventDefault(); logInWithEmailAndPassword(email, password)}}>
            <h2 className="text-start text-sm-center fs-1 fs-sm-3">{t('login')} </h2>
            <Form.Group as={Form.Floating} className='mb-2 mb-sm-3' controlId="formBasicEmail">
                <Form.Control type="email" placeholder={t('email')} onChange={(e)=>setEmail(e.target.value)}  autoComplete="username" value={email}/>
                <Form.Label className="text-secondary">{t('email')}</Form.Label>
            </Form.Group>

            <Form.Group as={Form.Floating} className='mb-2 mb-sm-3' controlId="formBasicPassword">
                <Form.Control type="password" placeholder={t('password')} onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" value={password} />
                <Form.Label className="text-secondary">{t('password')}</Form.Label>
                <Form.Text className="text-start text-muted"><Link to="/forgotpass">{t('forgotpass')}</Link></Form.Text>
            </Form.Group>

            <Form.Group className='text-start mb-2 mb-sm-3' controlId="formBasicCheckbox" >
                <Form.Check type="checkbox" label={t('loggedin')} />
            </Form.Group>

            <div className='text-start text-sm-center'>
                <Button type="submit" variant="primary">{t('login')}</Button>
                <div className='my-3'>{t('notmember')} <Link to="/register">{t('register')}</Link> </div>
                <hr></hr>
                <Button variant="light" onClick={signInWithGoogle}>
                    {t('googlesignin')}
                </Button>
            </div>
        </Form>
        </Col>
    );
}

export { Login };