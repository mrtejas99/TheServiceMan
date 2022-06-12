import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FaStar } from "react-icons/fa";

//translate
import { useTranslation } from "react-i18next";
function Sellers() {
    const {t} = useTranslation("common");

    const navigate = useNavigate();
    const location = useLocation(); //https://stackoverflow.com/a/70742138/10597778

    const [info , setInfo] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [fnames, setFnames] = useState(['']);
    const [lnames, setLnames] = useState(['']);
    const [feedbacks , setFeedbacks] = useState([]);

    let { id } = useParams(); //the user id
    console.log(id)    

    const Fetchdata = async ()=>{
        try {
            //get ads posted by the seller
            
            const q1 = query(collection(db, "serviceads"), where("posted_by", "==", id));
            const doc1 = await getDocs(q1);
            doc1.forEach(async element => {
                var data1 = element.data();
                //let rating = await FetchFeedbacks(doc1.posted_date);   //fetch feedback for each ad
                //data1.rating = rating;
                setInfo(arr => [...arr , data1]);
            });

            //get the seller details
            const q2 = query(collection(db, "users"), where("uid", "==", id));
            const doc2 = await getDocs(q2);
            const data2 = doc2.docs[0].data();
            //console.log(data2);
            setFname(data2.fname);
            setLname(data2.lname);
        } catch (err) {
            console.error(err);
            alert(t("errfetchposter"));
        }
    }
    const FetchFeedbacks = async (id)=>{
        try {
            info.forEach(async element=>{
                const q = query(collection(db, "feedback"), where("adid", "==", element.posted_date));
                const doc = await getDocs(q);
                let rating_total = doc.docs.reduce((sum, f) => sum + f.data().rating, 0);
                console.log(rating_total);
                element.rating =  rating_total/doc.docs.length;
                doc.forEach(x => {    //multiple feedback for one id
                    var data = x.data();
                    setFeedbacks(arr => [...arr , data]);
                });
            })  
        } catch (err) {
            console.error(err);
            alert(t("errfetchfeedback"));
        }
    }

    const FetchNames = async ()=>{
        try{
            //console.log(info);
            feedbacks.map( async d =>{
                if(!d.posted_by) return;
                const q = query(collection(db, "users"), where("uid", "==", d.posted_by));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                setFnames(fnames => [...fnames, data.fname]);
                setLnames(lnames => [...lnames, data.lname]);
            });
            //console.log(fnames)
        } catch (err) {
            console.error(err);
            alert(t("errfetchposter"));
        }
    }

    useEffect(() => {
        Fetchdata();    //fetch ads
    }, [location]);

    useEffect(()=>{
        FetchFeedbacks();   //fetch feedbacks for the ads
    },[info])

    useEffect(()=>{
        FetchNames();   //find names of feedback givers
    },[feedbacks])

    return(
        <Container className="py-3">
            <h3>{t('welcome')}, {fname} {lname}</h3>
            
            <p>{t('cumulativerating')} <span></span></p>
            <Row> 
                <Col className="w-75">
                    <h5>{t('postedads')}</h5>

                    <Row xs={1} md={2} lg={4} className="g-4">               
                    {
                    info.map((data, idx) => (
                        <Card className="highlight me-3" role="button" key={idx} style={{ width: '15rem' }} onClick={() => navigate(`/Adview/${data.posted_date}`)}>
                            <Card.Img variant="top" src={data.banner_url} />
                            <Card.Body className="zoomtext">
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Text>
                                {[...Array(5)].map((x, i)=>{
                                    const ratingValue=i+1;
                                    return (
                                        <label>
                                        <FaStar className="star" color={ratingValue<= (data.rating) ?"#ffc107":"#e4e5e9"}size={15}/>
                                        </label>
                                    );
                                })}
                                </Card.Text>
                                <Card.Text>{data.location}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                    }
                    </Row>
                </Col>
                
                <Col className="w-25">
                    <h5>{t('feedback')}</h5>
                    {
                    feedbacks.map((data,index) => (
                        fnames[index] && <Card style={{ height: '8rem'}}>
                            <Col>
                                <Card.Body>
                                    <Card.Title >{fnames[index]} {lnames[index]}</Card.Title>                                       
                                    <div>
                                    {[...Array(5)].map((star, i)=>{
                                        const ratingValue=i+1;
                                        return (
                                            <label>
                                            <FaStar className="star" color={ratingValue<= (data.rating) ?"#ffc107":"#e4e5e9"}size={15}/>
                                            </label>
                                                );
                                    })}
                                    </div>
                                    <Card.Text>{data.text}</Card.Text>
                                </Card.Body>
                            </Col>
                        </Card>
                    ))
                    }
                </Col>
            </Row>

        </Container>

    );
}

export { Sellers };
