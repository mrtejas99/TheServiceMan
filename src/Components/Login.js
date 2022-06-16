
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, Button } from "react-bootstrap";
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
    
    return(
        <Form className='w-50 mx-auto my-5' onSubmit={e => {e.preventDefault(); logInWithEmailAndPassword(email, password)}}>
            <h2 className="text-center">{t('login')} </h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control type="email" placeholder={t('email')} onChange={(e)=>setEmail(e.target.value)}  autoComplete="username" value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control type="password" placeholder={t('password')} onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" value={password} />
                <Form.Text className="text-muted"><Link to="/forgotpass">{t('forgotpass')}</Link></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                <Form.Check type="checkbox" label={t('loggedin')} />
            </Form.Group>

            <div className='text-center'>
                <Button type="submit" variant="primary">{t('login')}</Button>
                <div className='my-3'>{t('notmember')} <Link to="/register">{t('register')}</Link> </div>
                <hr></hr>
                <Button variant="light" onClick={signInWithGoogle}>
                    {t('googlesignin')}
                </Button>
            </div>
            
        </Form>
    );
}

export { Login };