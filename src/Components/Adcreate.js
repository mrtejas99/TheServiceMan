import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, saveAdData, storage  } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Container,  Col, Row, Button, Form, Dropdown } from "react-bootstrap";
//translate
import { useTranslation } from "react-i18next";

function Adcreate(){
    const [title, setTitle] = useState('');
    const [banner, setBanner] = useState(null);
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('');
    const [category, setCategory] = useState('');

    const {t} = useTranslation("common");

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
                <h2 className="text-center">{t('createad')} </h2>  
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>{t('title')}</Form.Label>
                        <Form.Control type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formImg" className="mb-3">
                        <Form.Label>{t('banner')}</Form.Label>
                        <Form.Control type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>{t('description')}</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExperience">
                        <Form.Label>{t('experience')}</Form.Label>
                        <Form.Control as="textarea" rows={3} value={experience} onChange={(e) => setExperience(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicSkills">
                        <Form.Label>{t('skills')}</Form.Label>
                        <Form.Control as="textarea" rows={3} value={skills} onChange={(e) => setSkills(e.target.value)}/>
                    </Form.Group>

                    <Dropdown className="my-3" onSelect={(e) =>setLocation(e)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-loc" >
                        {t('location')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='Panaji'>{t('panaji')}</Dropdown.Item>
                            <Dropdown.Item eventKey='Margao'>{t('margao')}</Dropdown.Item>
                            <Dropdown.Item eventKey='Mapusa'>{t('mapusa')}</Dropdown.Item>
                            <Dropdown.Item eventKey='Ponda'>{t('ponda')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="my-3" onSelect={(e) =>setLanguage(e)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-lang" >
                        {t('language')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='english'>English</Dropdown.Item>
                            <Dropdown.Item eventKey='bengali'>বাংলা</Dropdown.Item>
                            <Dropdown.Item eventKey='gujarati'>ગુજરાતી</Dropdown.Item>
                            <Dropdown.Item eventKey='hindi'>हिन्दी</Dropdown.Item>
                            <Dropdown.Item eventKey='kannada'>ಕನ್ನಡ</Dropdown.Item>
                            <Dropdown.Item eventKey='konkani'>कोंकणी</Dropdown.Item>
                            <Dropdown.Item eventKey='marathi'>मराठी</Dropdown.Item>
                            <Dropdown.Item eventKey='odia'>ଓଡିଆ</Dropdown.Item>
                            <Dropdown.Item eventKey='tamil'>தமிழ்</Dropdown.Item>
                            <Dropdown.Item eventKey='telugu'>தெலுங்கு</Dropdown.Item>
                        </Dropdown.Menu>
                    
                    </Dropdown>

                    <Dropdown className="my-3" onSelect={(e) =>setCategory(e)}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-category" >
                        {t('category')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item eventKey='Cook'>{t('cook')}</Dropdown.Item>
                            <Dropdown.Item eventKey='Electrician'>{t('electrician')}</Dropdown.Item>
                            <Dropdown.Item eventKey='Plumber'>{t('plumber')}</Dropdown.Item>
                            <Dropdown.Item eventKey='Beautician'>{t('beautician')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className='text-center'>
                        <Button variant="primary" className="w-50 m-auto" onClick={createServiceAd}>{t('createad')}</Button>
                    </div>
                </Col>
            </Row>
            </Form>
        </Container>

    );
}

export { Adcreate };
