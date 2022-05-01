
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
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
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Login </h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}  value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  value={password} />
                <Form.Text className="text-muted"><a href="/forgotpass">Forgot password?</a></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                <Form.Check type="checkbox" label="Stay logged in" />
            </Form.Group>

            <div className='text-center'>
                <Button variant="primary" onClick={() => logInWithEmailAndPassword(email, password)}>
                    Login
                </Button>
                <div className='my-3'>Not a member? <Link to="/register">Register</Link> now!</div>
                <hr></hr>
                <Button variant="light" onClick={signInWithGoogle}>
                    Sign in with Google
                </Button>
            </div>
            
        </Form>
    );
}
export { Login };