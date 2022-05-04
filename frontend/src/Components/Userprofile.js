import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Userprofile(){
    const [user, loading, error] = useAuthState(auth);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          console.log(data);
          setFname(data.fname);
          setLname(data.lname);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
        // eslint-disable-next-line
        fetchUserName();
        // eslint-disable-next-line
      }, [user, loading]);
    return(
            <Container className="py-3">
                <div className='d-flex justify-content-between py-3'>
                    <h3>Welcome, {fname}</h3>
                </div>
                <Row> 
                    <Col>
                        <h5>Profile</h5>
                        <Form className='d-flex py-1'>
                            <Form.Control type="text" value={'contact'} className="mr-sm-2" />
                            <Button variant="outline-success">&#128393;</Button>
                        </Form>
                            
                        <Form className='d-flex py-1'>
                            <Form.Control type="text" value={'password'} className="mr-sm-2" />
                            <Button variant="outline-success">&#128393;</Button>
                        </Form>
                    </Col>
                    <Col>
                        <Button variant="info" onClick={() => navigate("/Adcreate")}>Advertise on platform</Button><br />
                        <Button variant="info" onClick={() => navigate("/Sellers")} className='my-3'>Switch to Professional profile</Button>
                    </Col>
                </Row>
                
                <Row className='py-5'>
                    <Col>
                        <h5>Your ads</h5>
                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")} >View Ad</Button>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")}>View Ad</Button>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")}>View Ad</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <h5>Last viewed ads</h5>
                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")}>View Ad</Button>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }} className='my-3'>
                            <Card.Img variant="top" src="https://picsum.photos/200/100" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/Adview")}>View Ad</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>

    );
}
export { Userprofile };