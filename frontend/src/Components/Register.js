import React from 'react';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function Register(){
    return(
        <Form className='w-50 mx-auto my-5 px-3' >
            <h2 className="text-center">Register </h2>
            <Form.Group className="mb-3" controlId="formBasicfname">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="firstname" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasiclname">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="lastname" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirm">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="confirm" />
            </Form.Group>

            <div className='text-center'>
                <Button variant="primary" >
                    Register
                </Button>
                <div className='my-3'>Already a member? <a href="/login" >Sign in</a> now!</div>

            </div>
            
            
        </Form>
    );
}
export { Register };