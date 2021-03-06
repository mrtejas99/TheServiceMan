import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where, addDoc, updateDoc, increment, doc } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import { useTranslation } from "react-i18next";


function Servicefeedback(){
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation(); 

    const {t} = useTranslation("common");

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
                alert(t("erralreadygavefeedback"));
            else{
                const docRef =  addDoc(collection(db, "feedback"), {
                    posted_by:user1,
                    adid:AdId,
                    to:user2,
                    rating:Rating,
                    text:feedback,
                    posted_date: Date.now()
                });
                alert(t("feedbacksuccess"));
                //increment feedback_count and rating in serviceads
                console.log(fire_id);
                try{
                    const q = query(collection(db, "serviceads"), where("posted_date", "==", AdId));
                    const docx = await getDocs(q);
                    
                    const data = docx.docs[0].data();        
                    const r = (data.rating + Rating);
                    const c = (data.feedback_count + 1)
                    const avg = r/c;    //total number of stars divided by number of feedbacks for the ad
                    console.log("avg rating :"+avg);

                    const adRef = doc(db, 'serviceads', fire_id)
                    await updateDoc(adRef, {
                        rating: increment(Rating),
                        feedback_count: increment(1),
                        average: avg
                      });
                    console.log('updated serviceads');
                }
                catch(x){
                    console.log(x);
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
            <h2 className="text-center">{t("servicefeedback")}</h2>            

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t("sfeedbacklabel")}</Form.Label>
                <div>
                    <span>{t("rating") }</span>
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
                    {t("submit")}
                </Button>
            </div>
            
        </Form>
    );
}

export { Servicefeedback };