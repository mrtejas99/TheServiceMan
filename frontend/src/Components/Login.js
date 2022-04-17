import React from 'react';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function Login(){
    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Login </h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Text className="text-muted"><a href="/forgotpass">Forgot password?</a></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Stay logged in" />
            </Form.Group>

            <div className='text-center'>
                <Button variant="primary" type='submit'>
                    Submit
                </Button>
                <div className='my-3'>Not a member? <a href="/register" >Sign up</a> now!</div>
                <hr></hr>
                <Button variant="light" >
                    Sign in with Google
                </Button>
            </div>
            
        </Form>
    );
}
export { Login };