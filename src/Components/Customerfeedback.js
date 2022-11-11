import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth} from "../firebase";
import { Form, Button } from "react-bootstrap";
import {FaStar} from "react-icons/fa";

import { useTranslation } from "react-i18next";

function Customerfeedback() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const[rating, setRating]=useState(null);
    const[hover, setHover]=useState(null);
    const { t } = useTranslation("common");

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
      }, [user, loading]);

    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Customer feedback </h2>            
            <div>
                {[...Array(5)].map((star, i)=>{
                const ratingValue=i+1;
                return (
                    <label>
                        <input 
                        type="radio" 
                        name="rating"
                        style={{display:"none"}} 
                        value={ratingValue} 
                        onClick={()=>setRating(ratingValue)}
                        />
                        <FaStar className="star" color={ratingValue<= (hover||rating) ?"#ffc107":"black"}
                        onMouseEnter={()=>setHover(ratingValue)}
                        onMouseLeave={()=>setHover(null)}/>
                        </label>
                        );
                    })}
        </div>
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