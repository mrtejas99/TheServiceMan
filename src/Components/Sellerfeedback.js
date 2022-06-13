import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where,addDoc } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
function Sellerfeedback({user11,user22}){
    console.log(user22);
    const navigate = useNavigate();
    const location = useLocation(); 

    const [feedback , setfeedback]=useState(null);
    const[Rating, setRating]=useState(1);
    const[hover, setHover]=useState(null);
    const [user1, setUid1]=useState("");
    const [user2, setUid2]=useState("");
    const [AdId , setAdId]=useState("");
        const [user, loading, error] = useAuthState(auth);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      const Fetchdata = async ()=>{
         try {
            if(user.uid==location.state.posted_by){
            return navigate("/");
             }
            setUid2(user22);
            setUid1(user.uid);
            setAdId(location.state.posted_date);
            
        }
             catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
    
      // Fetchdata();
        if (loading) return;
       // if (!user) return navigate("/Login");
      }, [user, loading]);

     const createFeedback = () => {
        try {
          const docRef =  addDoc(collection(db, "sellerfeedback"), {
            posted_by:user11,
            to:user22,
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
        <>
        <Button variant="primary" onClick={handleShow}>
        Close Chat
        </Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Seller feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className='w-50 mx-auto my-5 '>
            <h6>{user2}{user1}</h6>
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
                <Button variant="primary"  onClick={createFeedback}>
                    Submit
                </Button>
            </div>
            
        </Form>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
        );
}

export default Sellerfeedback;