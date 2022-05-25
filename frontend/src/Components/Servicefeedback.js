import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";

function Servicefeedback() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
      }, [user, loading]);

    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Service feedback </h2>            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>How was your experience with the service?</Form.Label>
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

export { Servicefeedback };