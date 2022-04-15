import React from 'react';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function Forgotpass(){
    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Forgot password </h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <div className='text-center'>
                <Button variant="primary" >
                    Reset
                </Button>
            </div>
        </Form>
    );
}
export { Forgotpass };