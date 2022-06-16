import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Container, Col, Row, Button, Form } from "react-bootstrap";

import { db, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

//translate
import { useTranslation } from "react-i18next";

import { LANGUAGE_MASTER } from "../constants";
import { getFilterMasterData } from "../datautils";
import { UserContext } from "./UserContext";

function Adedit() {
    const { adid } = useParams();
    const { state } = useLocation();

    const [fieldData, setFieldData] = useState({});     //Store pre-filled values
    const updateFieldData = (field, value) => setFieldData(prev => ({
        ...prev,
        [field]: value
    }));
    const [currAdId, setCurrAdId] = useState(adid);     //ID of the ad to update
    const [catMaster, setCatMaster] = useState([]);     //Master data for all available categories
    const [geoMaster, setGeoMaster] = useState([]);     //Master data for all locations

    const {t} = useTranslation("common");

    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    //Wait for user login status to fetch master data
    useEffect(() => {
        if (userData && userData.loaded) {
            if (!userData.user_id) {
                return navigate("/Login");
            }
            
            getFilterMasterData("adcategories", "category_name")
                .then(categories => setCatMaster(categories))
                .catch(err => console.error(err));
            getFilterMasterData("locations", "location_name")
                .then(locat => setGeoMaster(locat));
        }
    }, [userData]);

    //Load pre-filled values
    useEffect(() => {
        let fetchAdId = (state && state.adid) || adid;
        setCurrAdId(fetchAdId);

        if (state && state.ad) {
            //We have a state with ad data from previous page. Just restore it
            setFieldData({
                'title': state.ad.title,
                'banner_url': state.ad.banner_url,
                'description': state.ad.description,
                'experience': state.ad.experience,
                'skills': state.ad.skills,
                'language': state.ad.language,
                'category': state.ad.category,
                'location': state.ad.location
            });
        } else if (!fieldData.hasOwnProperty('title')) {
            //We don't have state data, so try to fetch from database
            getDoc(doc(db, 'serviceads', fetchAdId))
            .then(document => document.data())
            .then(data => {
                setFieldData({
                    'title': data.title,
                    'banner_url': data.banner_url,
                    'description': data.description,
                    'experience': data.experience,
                    'skills': data.skills,
                    'language': data.language,
                    'category': data.category,
                    'location': data.location
                });
            })
            .catch(() => {
                alert(`The ad with id ${fetchAdId} doesn't exist`);
                navigate('/');
            });
        }
    }, [state, adid]);

    //add to firestore
    const createServiceAd = async () => {
        try {
            const adRef = doc(db, 'serviceads', currAdId)
            await updateDoc(adRef, fieldData);
            console.log('updated servicead');
            alert(t("adupdatesuccess"))
            navigate("/");
        }
        catch(x) {
            alert(x);
        }
    };

    const handleImageAsFile =  (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
         uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                updateFieldData('banner', downloadURL);
                console.log(fieldData.banner);
                //saveurl(downloadURL);
            });
        });
    }

    return(
        <Container className="py-3"> 
            <Form className='my-5 px-3' >    
            <Row className='py-5'>
                <h2 className="text-center">{t('updatead')} </h2>  
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>{t('title')}</Form.Label>
                        <Form.Control type="text" placeholder="Title" defaultValue={fieldData.title} onChange={(e) => updateFieldData('title', e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formImg" className="mb-3">
                        <Form.Label>{t('banner')}</Form.Label>
                        <Form.Control type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>{t('description')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={fieldData.description} onChange={(e) => updateFieldData('description', e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExperience">
                        <Form.Label>{t('experience')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={fieldData.experience} onChange={(e) => updateFieldData('experience', e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicSkills">
                        <Form.Label>{t('skills')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={fieldData.skills} onChange={(e) => updateFieldData('skills', e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLocation">
                        <Form.Label>{t('location')}</Form.Label>
                        <Form.Select className="my-3 w-50" defaultValue={fieldData.location} onChange={(e) => updateFieldData('location', e.target.value)}>
                        {
                            geoMaster.map((x)=><option value={x.location_name}>{t(x.location_name)}</option>)
                        }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLanguage">
                        <Form.Label>{t('language')}</Form.Label>
                        <Form.Select className="my-3 w-50" defaultValue={fieldData.language} onChange={(e) =>updateFieldData('language', e.target.value)}>
                        {
                            LANGUAGE_MASTER.map((x)=><option value={x.value}>{x.language_name}</option>)
                        }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>{t('category')}</Form.Label>
                        <Form.Select className="my-3 w-50" defaultValue={fieldData.category} onChange={(e) =>updateFieldData('category', e.target.value)}>
                        {
                            catMaster.map((x)=><option value={x.category_name}>{t(x.category_name)}</option>)
                        }
                        </Form.Select>
                    </Form.Group>
                    <div className='text-center'>
                        <Button variant="primary" className="w-50 m-auto" onClick={createServiceAd}>{t('updatead')}</Button>
                    </div>
                </Col>
            </Row>
            </Form>
        </Container>

    );
}

export { Adedit };
