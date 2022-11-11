import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {  useNavigate, useParams } from "react-router-dom";
import { auth, db, saveAdData, storage  } from "../firebase";
import { query, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Container,  Col, Row, Button, Form } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

import { LANGUAGE_MASTER } from "../constants";


function Adcreate() {
    const { adid } = useParams();
    const [title, setTitle] = useState('');
    const [banner, setBanner] = useState(null);
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [ad_location, setLocation] = useState(
        {"geohash":"tdu2pupc0", "latitude": 15.4909, "longitude":71.8278, "location_name":"Panaji" }
    );


    const [language, setLanguage] = useState('');
    const [category, setCategory] = useState('');

    const [catMaster, setCatMaster] = useState([]);
    const [geoMaster, setGeoMaster] = useState([]);

    const {t} = useTranslation("common");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    //console.log(adid);

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
    const createServiceAd = async (e) => {
        saveAdData(user.uid, title, banner, description, experience, skills, ad_location.location_name, Number(ad_location.latitude), Number(ad_location.longitude), ad_location.geohash, language, category);
        navigate("/");
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
                        <Form.Control type="text" placeholder="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formImg" className="mb-3">
                        <Form.Label>{t('banner')}</Form.Label>
                        <Form.Control type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>{t('description')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={description} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExperience">
                        <Form.Label>{t('experience')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={experience} onChange={(e) => setExperience(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicSkills">
                        <Form.Label>{t('skills')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={skills} onChange={(e) => setSkills(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLocation">
                        <Form.Label>{t('location')}</Form.Label>
                        <Form.Select className="my-3 w-50"  onChange={(e) =>setLocation(JSON.parse(e.target.value))}>
                        {
                            geoMaster.map((x)=><option value={JSON.stringify(x)} >{t(x.location_name)}</option>)
                        }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLanguage">
                        <Form.Label>{t('language')}</Form.Label>
                        <Form.Select className="my-3 w-50" defaultValue={language} onChange={(e) =>setLanguage(e.target.value)}> 
                        {
                            LANGUAGE_MASTER.map((x)=><option value={x.value}>{x.language_name}</option>)
                        }
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>{t('category')}</Form.Label>
                        <Form.Select className="my-3 w-50" defaultValue={category} onChange={(e) =>setCategory(e.target.value)}>
                        {   //to prevent showing first option as blank 
                            catMaster.map((x)=> x.category_name && <option value={x.category_name}>{t(x.category_name)}</option>)
                        }
                        </Form.Select>
                    </Form.Group>

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
