import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, saveAdData, storage  } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Container,  Col, Row, Button, Form, Dropdown } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

import { LANGUAGE_MASTER } from "../constants";


function Adcreate(){
    const [title, setTitle] = useState('');
    const [banner, setBanner] = useState(null);
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('');
    const [category, setCategory] = useState('');

    const [catMaster, setCatMaster] = useState([]);
    const [geoMaster, setGeoMaster] = useState([]);

    const {t} = useTranslation("common");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const getFilterMasterData = (colle, name_field) => (
        getDocs(query(collection(db, colle),))
        .then(data => data.docs.map(element => element.data()))
    );

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
        getFilterMasterData("adcategories", "category_name")
            .then(categories => setCatMaster(categories))
            .catch(err => console.error(err));
        getFilterMasterData("locations", "location_name")
            .then(locat => setGeoMaster(locat))
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
                    {
                    geoMaster.map((x)=><option value={x.location_name}>{x.location_name}</option>)
                    }
                    </select>

                    <select className="my-3 form-select w-50" value={language} onChange={(e) =>setLanguage(e.target.value)}>
                    {
                        LANGUAGE_MASTER.map((x)=><option value={x.value}>{x.language_name}</option>)
                    }
                    </select>

                    <select className="my-3 form-select w-50" value={category} onChange={(e) =>setCategory(e.target.value)}>
                    {
                        catMaster.map((x)=><option value={x.category_name}>{x.category_name}</option>)
                    }
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
