import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where,addDoc } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import {FaStar} from "react-icons/fa";

function Customerfeedback(){
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation(); 

    const [feedback , setfeedback] = useState(null);
    const [Rating, setRating] = useState("1");
    const [hover, setHover] = useState(null);
    const [user1, setUid1] = useState("");
    const [user2, setUid2] = useState("");
    const [AdId , setAdId] = useState("");
   
    const Fetchdata = async ()=>{
        try {
            setUid2(location.state.posted_by);
            setUid1(user.uid);
            setAdId(location.state.posted_date);

        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        Fetchdata();
        if (loading) return;
        if (!user) return navigate("/Login");
    }, [user, loading]);


     const createFeedback = () => {
        try {
            const docRef =  addDoc(collection(db, "feedback"), {
                posted_by:user1,
                adid:AdId,
                to:user2,
                rating:Rating,
                text:feedback,
                posted_date: Date.now()
            });
            alert("Document written with ID: ", docRef.id);
        } catch (e) {
            alert("Error adding document: ", e);
        }
        navigate("/Login");
    };

    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Customer feedback </h2>            

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>How was your experience with the customer?</Form.Label>
                <div>
                    <span>Rating </span>
                    {[...Array(5)].map((star, i)=>{
                    const ratingValue=i+1;
                    return (
                        <label>
                            <input 
                            type="radio" 
                            name="Rating"
                            style={{display:"none"}} 
                            value={ratingValue} 
                            onClick={()=>setRating(ratingValue)}
                            />
                            <FaStar className="star" color={ratingValue<= (hover||Rating) ?"#ffc107":"black"}
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(null)}/>
                        </label>
                            );
                        })}
                </div>
                <Form.Control as="textarea" placeholder="feedback message" rows={3} onChange={(e)=>setfeedback(e.target.value)}  value={feedback}/>
            </Form.Group>
            <div className='text-center'>
                <Button variant="primary" onClick={createFeedback} >
                    Submit
                </Button>
            </div>
            
        </Form>
    );
}

export { Customerfeedback };