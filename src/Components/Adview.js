import React, { Suspense, useEffect, useState } from "react";
import { Container, Button, Col, Row, Card, Breadcrumb, Table, Image, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import logo from '../profile.png'
import {FaStar} from "react-icons/fa";


// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Adview(){
    const [user, loading, error] = useAuthState(auth);  //needed to check for feedback
    const { id } = useParams(); //the ad id
    console.log(id);
    //const location = useLocation(); //https://stackoverflow.com/a/70742138/10597778        

    const navigate = useNavigate();
    const [ad, setAd] = useState({skills:"none"});   //since it is an document
    const [feedbacks , setFeedbacks] = useState([]);

    const [fnames, setFnames] = useState([]);
    const [lnames, setLnames] = useState([]);

    const [posterFname, setPosterFname] = useState('');
    const [posterLname, setPosterLname] = useState('');


    const logoStyle={
        resizeMode: "cover",
        maxHeight: '8rem',
        maxWidth: '8rem'
    }

    const FetchAd = async ()=>{
        try {
            if (!id) {alert("fetching before id value found");return;} 
            const q = query(collection(db, "serviceads"), where('posted_date', "==", id));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();    //only one matching ad for each id
            setAd(data);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching ad data");
        }
    }

    const FetchFeedbacks = async ()=>{
        try {
            const q = query(collection(db, "feedback"), where("adid", "==", id) );
            const doc = await getDocs(q);
            doc.forEach(element => {    //multiple feedback for one id
                var data = element.data();
                setFeedbacks(arr => [...arr , data]);
            });
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching feedbacks");
        }

        try{
            const q = query(collection(db, "users"),where("uid", "==",ad.posted_by) );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setPosterFname(data.fname);
            setPosterLname(data.lname);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching names of Ad poster");
        }
    }

    const FetchNames = async ()=>{
        try{
            feedbacks.map( async d =>{
                const q = query(collection(db, "users"), where("uid", "==", ad.posted_by));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                setFnames(fnames => [...fnames, data.fname]);
                setLnames(lnames => [...lnames, data.lname]);
            });
            //console.log(fnames)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching names of feedbackers");
        }
    }

    useEffect(() => {
        FetchAd();
    }, [id]);

    useEffect(() => {
        FetchFeedbacks();
    }, [ad]);

    useEffect(() => {
        FetchNames();
    }, [feedbacks]);

    return(
        <Suspense fallback={"Loading..."}>
            <Container className="py-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">{ad.category}</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Goa</Breadcrumb.Item>
                    <Breadcrumb.Item active>{ad.location}</Breadcrumb.Item>
                </Breadcrumb>
                
                <Row className='py-5'>
                    <Col>
                        <h3>{ad.title}</h3>
                        <Image style={{resizeMode: "cover"}} src={ad.banner_url}/>
                        <h4 >Description</h4>
                        <p>{ad.description}</p>

                        <h4>Experience</h4>
                        <p>{ad.experience}</p>
                    </Col>
                   
                    <Col >
                        <h4>Skills</h4>
                        <div className='py-3'>
                            { 
                                ad.skills.split(",").map((e) => <Badge  className="m-1" bg="secondary">{e}</Badge>)
                            }
                        </div>
                        <h4>User description</h4>

                        <Card style={{ width: '25rem'}} className="my-3">
                            <Row>
                                <Col className="w-25"><Card.Img className='px-2 py-2'variant="top" src={logo} style={logoStyle} /></Col>
                                <Col className="w-75">
                                <Card.Body>
                                    <Card.Title>{posterFname} {posterLname}</Card.Title>
                                    <br/>
                                    <Button variant="primary" className="btn-sm my-0 me-3" onClick={() => {
                                        if(user.uid!=ad.posted_by) 
                                            navigate("/customerfeedback/",{state:{posted_by:ad.posted_by,posted_date:ad.posted_date}})
                                        else 
                                            alert("You cannot give feedback to your Ad");}}>Feedback
                                        </Button>
                                    <Button variant="primary" className="btn-sm my-0" onClick={() => navigate("/chat",{state:{posted_by:ad.posted_by}})} >Chat</Button>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>

                        <h4>Feedback</h4>                                     
                        {
                        feedbacks.map((data,index) => (
                            <Card style={{ height: '8rem'}}>
                            <Row>
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
                            </Row>
                            </Card>
                        ))
                        }
                        <Link className="my-3" to="/Sellers" state={{posted_by:ad.posted_by}}>View more</Link>
                    </Col>
                </Row>

            </Container>
        </Suspense>
    );
}

export { Adview };
