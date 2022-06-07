import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where, addDoc, updateDoc, increment, doc } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import {FaStar} from "react-icons/fa";

function Servicefeedback(){
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation(); 

    const [feedback , setfeedback] = useState(null);
    const [Rating, setRating] = useState(1);
    const [hover, setHover] = useState(null);
    const [user1, setUid1] = useState("");
    const [user2, setUid2] = useState("");
    const [AdId , setAdId] = useState("");
    const [data,setData] = useState("")
    const [fire_id, setFireId] = useState("")  ;    //actual firebase docid of servicead

    useEffect(() => {
        setUid2(location.state.posted_by);
        setUid1(user.uid);
        setAdId(location.state.posted_date);
        setFireId(location.state.fire_id);

        checkIfUserGaveFeedback();
        if (loading) return;
        if (!user) return navigate("/Login");
    }, [user, data, user1, AdId, loading]);

    //check if the current user already gave feedback for the ad
    const checkIfUserGaveFeedback = async () => {
        try{
            console.log(`feedback by ${user1} for ad ${AdId} which was posted by ${user2}`)
            const q = query(collection(db, "feedback"), where("adid", "==", AdId), where("posted_by", "==", user1));
            const doc = await getDocs(q);
            const data = doc.docs[0].data() || null;
            setData(data.text);
        } catch (err) {
            console.error(err);
            //alert("An error occured while fetching check If User Gave Feedback");
        }
    }

    const createFeedback = async () => {
        try {
            if(data)
                alert("You have already given feedback for the Ad");
            else{
                const docRef =  addDoc(collection(db, "feedback"), {
                    posted_by:user1,
                    adid:AdId,
                    to:user2,
                    rating:Rating,
                    text:feedback,
                    posted_date: Date.now()
                });
                alert("Document written with ID: ", docRef.ref);
                //increment feedback_count and rating in serviceads
                console.log(fire_id);
                try{
                    const adRef = doc(db, 'serviceads', fire_id)
                    await updateDoc(adRef, {
                        rating: increment(Rating),
                        feedback_count: increment(1)
                      });
                    console.log('updated serviceads');
                }
                catch(x){
                    alert(x);
                }
            }
        } catch (e) {
            console.log(e);
            alert(e);
        }finally{
            navigate(`/Adview/${AdId}`)
        }
        
    };

    return(
        <Form className='w-50 mx-auto my-5 '>
            <h2 className="text-center">Service feedback </h2>            

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>How was your experience with the service?</Form.Label>
                <div>
                    <span>Rating </span>
                    {[...Array(5)].map((star, i)=>{
                    const ratingValue=i+1;
                    //alert(`type ${typeof ratingValue} value ${ratingValue}`)
                    return (
                        <label>
                            <input 
                            type="radio" 
                            name="Rating"
                            style={{display:"none"}} 
                            value={ratingValue} 
                            onClick={()=>setRating(Number(ratingValue))}
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

export { Servicefeedback };