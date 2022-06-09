import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth, db, logout, saveAdData, storage  } from "../firebase";
import { query, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Container,  Col, Row, Button, Form, Dropdown } from "react-bootstrap";

//translate
import { useTranslation } from "react-i18next";

import { LANGUAGE_MASTER } from "../constants";
import { useLocaleState } from "react-admin";


function Adedit() {
    const { adid } = useParams();
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [banner, setBanner] = useState('');
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [ad_location, setLocation] = useState('');
    const [language, setLanguage] = useState('');
    const [category, setCategory] = useState('');

    const [catMaster, setCatMaster] = useState([]);
    const [geoMaster, setGeoMaster] = useState([]);

    const {t} = useTranslation("common");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    //console.log(adid);
    console.log(location.state.ad)

    const getFilterMasterData = (colle, name_field) => (
        getDocs(query(collection(db, colle),))
        .then(data => data.docs.map(element => element.data()))
    );

    useEffect(() => {
        setTitle(location.state.ad.title)
        setBanner(location.state.ad.banner_url)
        setDescription(location.state.ad.description)
        setExperience(location.state.ad.experience)
        setSkills(location.state.ad.skills)
        setLocation(location.state.ad.location)
        setLanguage(location.state.ad.language)
        setCategory(location.state.ad.category)

        if (loading) return;
        if (!user) return navigate("/Login");
        getFilterMasterData("adcategories", "category_name")
            .then(categories => setCatMaster(categories))
            .catch(err => console.error(err));
        getFilterMasterData("locations", "location_name")
            .then(locat => setGeoMaster(locat))
    }, [user, loading, location.ad]);

    //add to firestore
    const createServiceAd = async () => {
        try{
            const fireid = location.state.ad.id;
            const adRef = doc(db, 'serviceads',fireid )
            await updateDoc(adRef, {
                title:title, 
                banner_url: banner, 
                description: description, 
                experience: experience, 
                skills: skills, 
                location: location, 
                language: language, 
                category: category,
                location: ad_location
                });
            console.log('updated servicead');
            alert(t("adupdatesuccess"))
            navigate("/");
        }
        catch(x){
            alert(x);
        }
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
                <h2 className="text-center">{t('updatead')} </h2>  
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>{t('title')}</Form.Label>
                        <Form.Control type="text" placeholder="title" defaultValue={location.state.ad.title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formImg" className="mb-3">
                        <Form.Label>{t('banner')}</Form.Label>
                        <Form.Control type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>{t('description')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={location.state.ad.description} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExperience">
                        <Form.Label>{t('experience')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={location.state.ad.experience} onChange={(e) => setExperience(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicSkills">
                        <Form.Label>{t('skills')}</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={location.state.ad.skills} onChange={(e) => setSkills(e.target.value)}/>
                    </Form.Group>

                    <select className="my-3 form-select w-50" defaultValue={location.state.ad.location} onChange={(e) =>setLocation(e.target.value)}>
                    {
                        geoMaster.map((x)=><option value={x.location_name}>{t(x.location_name)}</option>)
                    }
                    </select>

                    <select className="my-3 form-select w-50" defaultValue={location.state.ad.language} onChange={(e) =>setLanguage(e.target.value)}>
                    {
                        LANGUAGE_MASTER.map((x)=><option value={x.value}>{x.language_name}</option>)
                    }
                    </select>

                    <select className="my-3 form-select w-50" defaultValue={location.state.ad.category} onChange={(e) =>setCategory(e.target.value)}>
                    {
                        catMaster.map((x)=><option value={x.category_name}>{t(x.category_name)}</option>)
                    }
                    </select>

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
