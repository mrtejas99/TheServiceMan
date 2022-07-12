import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where,addDoc } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';

import { useTranslation } from "react-i18next";

function Sellerfeedback({user11,user22}){
    console.log(user22);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation("common");

    const [feedback , setfeedback]=useState(null);
    const[Rating, setRating]=useState(1);
    const[hover, setHover]=useState(null);
    const [user1, setUid1]=useState("");
    const [user2, setUid2]=useState("");
    const [AdId , setAdId]=useState("");
    const [posterFname, setPosterFname] = useState('');
    const [posterLname, setPosterLname] = useState('');
    const [user, loading, error] = useAuthState(auth);

    const [show, setShow] = useState(false);
    const handleClose = () => { 
        navigate("/");setShow(false);
        }
    const handleShow = () => setShow(true);
      const Fetchdata = async ()=>{
         try{
              const q = query(collection(db, "users"),where("uid", "==",user22));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setPosterFname(data.fname);
            setPosterLname(data.lname);
        }
         catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
    
      Fetchdata();
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
        {t('close')}
        </Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className='w-50 mx-auto my-5 '>
            <h6>{user2}{user1}</h6>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t('How was your experience with the')} {posterFname} {posterLname}?</Form.Label>
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
            {t('skip')}&gt;&gt;
          </Button>
        </Modal.Footer>
      </Modal>
      </>
        );
}

export default Sellerfeedback;
