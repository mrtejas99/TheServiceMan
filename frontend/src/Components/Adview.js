import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row, Card, Breadcrumb, Table, Image, Badge } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../profile.png'
import {FaStar} from "react-icons/fa";


// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
 
function Adview(){
    const location = useLocation(); //https://stackoverflow.com/a/70742138/10597778
    const navigate = useNavigate();
    console.log(location.state.posted_date);
    const [info , setInfo] = useState([]);

    // const [fname, setFname] = useState('');
    // const [lname, setLname] = useState('');
    // const [fuid, setFuid] = useState('');


    const [fnames, setFnames] = useState([]);
    const [lnames, setLnames] = useState([]);

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
    }

    const FetchNames = async ()=>{
        try{
            console.log(info.keys());
            info.map( async d =>{
                const q = query(collection(db, "users"), where("uid", "==", d.posted_by));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                console.log(data.fname);
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
                    <Breadcrumb.Item href="#">Cook</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Goa</Breadcrumb.Item>
                    <Breadcrumb.Item active>Panaji</Breadcrumb.Item>
                </Breadcrumb>
                
                <Row className='py-5'>
                    <Col>
                        <h5>{location.state.title}</h5>
                        <Image styel={{resizeMode: "cover"}} src={location.state.banner_url}/>
                        <h5 >Description</h5>
                        <p>{location.state.description}</p>

                        <h5>Experience</h5>
                        <p>{location.state.experience}</p>
                    </Col>
                   
                    <Col >
                        <h5>Skills</h5>
                        <div className='py-3'>
                            { 
                                location.state.skills.split(",").map((e) => <Badge  className="m-1" bg="secondary">{e}</Badge>)
                            }
                        </div>
                        <h5>User description</h5>

                        <Card style={{ width: '25rem'}} className="my-3">
                            <Row>
                                <Col><Card.Img className='px-3 py-3'variant="top" src={logo} style={logoStyle} /></Col>
                                <Col>
                                <Card.Body>
                                    <Card.Title>{location.state.fname} {location.state.lname}</Card.Title>
                                    <br/>
                                    <Button variant="primary" className="btn-sm" onClick={() => navigate("/customerfeedback",{state:{posted_by:location.state.posted_by,posted_date:location.state.posted_date}})} >Feedback</Button>
                                    <br/>
                                    <Button variant="primary" className="btn-sm" onClick={() => navigate("/chat",{state:{posted_by:location.state.posted_by}})} >Chat</Button>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>

                        <h5>Feedback</h5>                                     
                        {
                        info.map((data,index) => (
                            <Card style={{ width: '25rem'}}>
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
                        <Link to="/Sellers" state={{posted_by:location.state.posted_by}}>View more</Link>
                    </Col>
                </Row>

            </Container>

    );
}

export { Adview };
