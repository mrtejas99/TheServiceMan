import React from 'react';
import { Form, Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
function Customerfeedback(){
    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Customer feedback </h2>            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>How was your experience with the customer?</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <div className='text-center'>
                <Button variant="primary" >
                    Submit
                </Button>
            </div>
            
        </Form>
    );
}
export { Customerfeedback };