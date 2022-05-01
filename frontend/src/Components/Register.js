import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Register(){
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfPassword] = useState('');

    const [user, loading, error] = useAuthState(auth);
    const register = () => {
      if (!fname || !lname) alert("Please enter name");
      if(password != confirmpassword) alert("confirm password should match");
      registerWithEmailAndPassword(fname, lname, email, password);
    };
    const navigate = useNavigate();
    useEffect(() => {
      if (loading) return;
      if (user) navigate("/Userprofile");
      // eslint-disable-next-line
    }, [user, loading]);


    return(
        <Form className='w-50 mx-auto my-5 px-3'>
            <h2 className="text-center">Register </h2>
            <Form.Group className="mb-3" controlId="formBasicfname">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="firstname" onChange={(e)=>setFname(e.target.value)}  value={fname}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasiclname">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="lastname" onChange={(e)=>setLname(e.target.value)}  value={lname}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}  value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  value={password}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirm">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="confirm" onChange={(e)=>setConfPassword(e.target.value)}  value={confirmpassword}/>
            </Form.Group>

            <div className='text-center'>
                <Button variant="primary" onClick={register}>
                    Register
                </Button>
                <div className='my-3'>Already a member? <Link to="/login">Login</Link> </div>
                <hr></hr>
                <Button variant="light" onClick={signInWithGoogle}>
                    Register using Google
                </Button>
            </div>
            
            
        </Form>
    );
}
export { Register };