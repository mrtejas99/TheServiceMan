import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, saveAdData, storage  } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Container,  Col, Row, Button, Form, Dropdown } from "react-bootstrap";

function Adcreate(){
    const [title, setTitle] = useState('');
    const [banner, setBanner] = useState(null);
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('');
    const [category, setCategory] = useState('');

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
      }, [user, loading]);

    //add to firestore
    const createServiceAd = () => {
        saveAdData(user.uid, title, banner, description, experience, skills, location, language, category);
        navigate("/Login");
    };

    const handleImageAsFile =  (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
         uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setBanner(downloadURL);
                console.log(banner);
                //saveurl(downloadURL);
            });
        });
    }

    return(
        <Container className="py-3"> 
            <Form className='my-5 px-3' >    
            <Row className='py-5'>
                <h2 className="text-center">Create Ad </h2>  
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formImg" className="mb-3">
                        <Form.Label>Banner</Form.Label>
                        <Form.Control type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExperience">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control as="textarea" rows={3} value={experience} onChange={(e) => setExperience(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicSkills">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control as="textarea" rows={3} value={skills} onChange={(e) => setSkills(e.target.value)}/>
                    </Form.Group>

                    <Dropdown className="my-3" onSelect={(e) =>setLocation(e)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-loc" >
                            Location
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='Panaji'>Panaji</Dropdown.Item>
                            <Dropdown.Item eventKey='Margao'>Margao</Dropdown.Item>
                            <Dropdown.Item eventKey='Mapusa'>Mapusa</Dropdown.Item>
                            <Dropdown.Item eventKey='Ponda'>Ponda</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="my-3" onSelect={(e) =>setLanguage(e)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-lang" >
                            Language
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='English'>English</Dropdown.Item>
                            <Dropdown.Item eventKey='Hindi'>Hindi</Dropdown.Item>
                            <Dropdown.Item eventKey='Marathi'>Marathi</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="my-3" onSelect={(e) =>setCategory(e)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-category" >
                            Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item eventKey='Cook'>Cook</Dropdown.Item>
                            <Dropdown.Item eventKey='Electrician'>Electrician</Dropdown.Item>
                            <Dropdown.Item eventKey='Plumber'>Plumber</Dropdown.Item>
                            <Dropdown.Item eventKey='Beautician'>Beautician</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className='text-center'>
                        <Button variant="primary" className="w-50 m-auto" onClick={createServiceAd}>Create Ad</Button>
                    </div>
                </Col>
            </Row>
            </Form>
        </Container>

    );
}

export { Adcreate };
