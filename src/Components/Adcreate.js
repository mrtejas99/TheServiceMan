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

                    <select className="my-3 form-select w-50" value={location} onChange={(e) =>setLocation(e.target.value)}>
                        <option eventKey='Panaji'>{t('panaji')}</option>
                        <option eventKey='Margao'>{t('margao')}</option>
                        <option eventKey='Mapusa'>{t('mapusa')}</option>
                        <option eventKey='Ponda'>{t('ponda')}</option>
                    </select>

                    <select className="my-3 form-select w-50" value={language} onChange={(e) =>setLanguage(e.target.value)}>
                        <option value='english'>English</option>
                        <option value='bengali'>বাংলা</option>
                        <option value='gujarati'>ગુજરાતી</option>
                        <option value='hindi'>हिन्दी</option>
                        <option value='kannada'>ಕನ್ನಡ</option>
                        <option value='konkani'>कोंकणी</option>
                        <option value='marathi'>मराठी</option>
                        <option value='odia'>ଓଡିଆ</option>
                        <option value='tamil'>தமிழ்</option>
                        <option value='telugu'>தெலுங்கு</option>
                    </select>

                    <select className="my-3 form-select w-50" value={category} onChange={(e) =>setCategory(e.target.value)}>
                        <option value='Cook'>{t('cook')}</option>
                        <option value='Electrician'>{t('electrician')}</option>
                        <option value='Plumber'>{t('plumber')}</option>
                        <option value='Beautician'>{t('beautician')}</option>
                    </select>

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
