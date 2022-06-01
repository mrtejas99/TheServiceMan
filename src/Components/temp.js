import React from 'react';

// Import Firestore database
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { useState } from 'react';
  
// Define how each display entry will be structured
const Frame = ({posted_by, 
    title, 
    banner_url, 
    description,
    experience ,
    skills ,
    location ,
    language ,
    category ,
    posted_date}) => {
    console.log(posted_by+" "+title+" "+ banner_url+" "+
        description+" "+ experience+" "+ skills+" "+
        location+" "+ language+" "+category+" "+posted_date);
    return (
        <center>
            <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>                 
                <tr><td>posted_by</td><td>{posted_by}</td></tr>
                <tr><td>title </td><td> {title}</td></tr>
                <tr><td>banner_url </td><td> {banner_url}</td></tr>
                <tr><td>description </td><td> {description}</td></tr>
                <tr><td>experience </td><td> {experience}</td></tr>
                <tr><td>skills </td><td> {skills}</td></tr>
                <tr><td>location </td><td> {location}</td></tr>
                <tr><td>language </td><td> {language}</td></tr>
                <tr><td>category </td><td> {category}</td></tr>
                <tr><td>posted_date </td><td> {posted_date}</td></tr>   
            </table>
        </center>
    );
}

const Fetch = () => {
    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = async ()=>{
        try {
            const q = query(collection(db, "serviceads"));
            const doc = await getDocs(q);
            doc.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
            });
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching ads");
        }
    }
      
    // Display the result on the page
    return (
        <div>
            <center>
            <h2>Ads</h2>
            </center>  
            {
            info.map((data) => (
                <Frame 
                    posted_by = {data.posted_by}
                    title = {data.title}
                    banner_url = {data.banner_url}
                    description = {data.description}
                    experience = {data.experience}
                    skills = {data.skills}
                    location = {data.location}
                    language = {data.language}
                    category = {data.category}
                    posted_date = {data.posted_date}/>
            ))
            }
        </div>
    );
}
  

  
export {Fetch};
