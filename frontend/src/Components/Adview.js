import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row, Card, Breadcrumb, Table, Image, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../profile.png'
import {FaStar} from "react-icons/fa";


// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Adview(){
    const [user, loading, error] = useAuthState(auth);
    
    const location = useLocation(); //https://stackoverflow.com/a/70742138/10597778
    const navigate = useNavigate();
    console.log(location.state.posted_date);
    const [info , setInfo] = useState([]);

    const [fnames, setFnames] = useState([]);
    const [lnames, setLnames] = useState([]);

    const [posterFname, setPosterFname] = useState('');
    const [posterLname, setPosterLname] = useState('');


    const logoStyle={
        resizeMode: "cover",
        maxHeight: '8rem',
        maxWidth: '8rem'
    }
    const Fetchdata = async ()=>{
        try {
            const q = query(collection(db, "feedback"),where("adid", "==",location.state.posted_date) );
            const doc = await getDocs(q);
            doc.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
            });

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching feedbacks");
        }

        try{
            const q = query(collection(db, "users"),where("uid", "==",location.state.posted_by) );
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
            console.log(info.keys());
            info.map( async d =>{
                const q = query(collection(db, "users"), where("uid", "==", d.posted_by));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                setFnames(fnames => [...fnames, data.fname]);
                setLnames(lnames => [...lnames, data.lname]);
            });
            console.log(fnames)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching names of feedbackers");
        }
    }

    useEffect(() => {
        Fetchdata();
    }, []);

    useEffect(() => {
        FetchNames();
    }, [info]);

    return(
            <Container className="py-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">{location.state.category}</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Goa</Breadcrumb.Item>
                    <Breadcrumb.Item active>{location.state.location}</Breadcrumb.Item>
                </Breadcrumb>
                
                <Row className='py-5'>
                    <Col>
                        <h3>{location.state.title}</h3>
                        <Image style={{resizeMode: "cover"}} src={location.state.banner_url}/>
                        <h4 >Description</h4>
                        <p>{location.state.description}</p>

                        <h4>Experience</h4>
                        <p>{location.state.experience}</p>
                    </Col>
                   
                    <Col >
                        <h4>Skills</h4>
                        <div className='py-3'>
                            { 
                                location.state.skills.split(",").map((e) => <Badge  className="m-1" bg="secondary">{e}</Badge>)
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
                                        if(user.uid!=location.state.posted_by) 
                                            navigate("/customerfeedback",{state:{posted_by:location.state.posted_by,posted_date:location.state.posted_date}})
                                        else 
                                            alert("You cannot give feedback to your Ad");}}>Feedback
                                        </Button>
                                    <Button variant="primary" className="btn-sm my-0" onClick={() => navigate("/chat",{state:{posted_by:location.state.posted_by}})} >Chat</Button>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>

                        <h4>Feedback</h4>                                     
                        {
                        info.map((data,index) => (
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
                        <Link className="my-3" to="/Sellers" state={{posted_by:location.state.posted_by}}>View more</Link>
                    </Col>
                </Row>

            </Container>

    );
}

export { Adview };
