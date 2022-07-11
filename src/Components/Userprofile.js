import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

import { FaStar } from "react-icons/fa";

function Userprofile() {
    const [user, loading, error] = useAuthState(auth);
    const [fname, setFname] = useState("");
    const [info , setInfo] = useState([]);
    const navigate = useNavigate();
    const {t} = useTranslation("common");

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          //console.log(data);
          setFname(data.fname);
        } catch (err) {
          console.error(err);
          alert(t("errfetchposter"));
        }
    };

    const fetchUserAds = async () => {
        try{
            const q = query(collection(db, "serviceads"), where("posted_by", "==", user.uid));
            const doc = await getDocs(q);
            doc.forEach(element => {
                var data = element.data();
                //console.log(data);
                setInfo(arr => [...arr , data]);
            });
            
        } catch (err) {
            console.error(err);
            alert(t("errfetchad"));
        }
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
        //console.log(user);
        // eslint-disable-next-line
        fetchUserName();
        fetchUserAds();
        // eslint-disable-next-line
      }, [user, loading]);
    return(
            <Container className="py-3">
                <div className='d-flex justify-content-between py-3'>
                    <h3>{t('welcome')}, {fname}</h3>
                </div>
                <br/>   
                <h4>{t('yourads')}</h4> 
                <Row xs={2} sm={3} md={4} lg={6} className="g-4">          
                    {
                    info.map((data) => (
                        <Card style={{ width: '15rem' }} className='me-3'>
                            <Card.Img variant="top" src={data.banner_url} />
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Text>
                                    {[...Array(5)].map((x, i)=>{
                                        const ratingValue=i+1;
                                        return (
                                            <label>
                                            <FaStar className="star" color={ratingValue<= (data.rating/data.feedback_count) ?"#ffc107":"#e4e5e9"}size={15}/>
                                            </label>
                                        );
                                    })}
                                    </Card.Text>
                                <Card.Text>{data.location}</Card.Text>
                                <Button variant="primary" onClick={() => navigate(`/Adview/${data.posted_date}`, {state:{title:data.title, banner_url:data.banner_url, description: data.description, experience: data.experience, skills:data.skills, language: data.language, category: data.category, location: data.location, posted_by: data.posted_by}})}>{t('viewad')}</Button>
                            </Card.Body>
                        </Card>
                    ))
                    }
                </Row>

            </Container>

    );
}

export { Userprofile };
