import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './Components/Home'
import { Navigation } from './Components/Navigation'
import { Footer } from './Components/Footer'
import { Login } from './Components/Login'
import { Register } from './Components/Register'
import { Error } from './Components/Error'
import { Forgotpass } from "./Components/Forgotpass";
import { Userprofile } from "./Components/Userprofile";
import { Adview } from './Components/Adview';
import { Customerfeedback } from './Components/Customerfeedback'
import { Servicefeedback } from './Components/Servicefeedback'
import { Adcreate } from "./Components/Adcreate";
import { Sellers } from "./Components/Sellers"
import { Customers } from "./Components/Customers"
import { Fetch } from "./Components/temp"
import { Logout } from "./Components/Logout"
import useLocalStorage from 'use-local-storage'
import { Button } from 'bootstrap';


function App() {

  return (
    <div className='app' >
      <Navigation /> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgotpass" element={<Forgotpass/>} />
          <Route path="/Userprofile" element={<Userprofile/>} />
          <Route path="/Adview" element={<Adview/>} />
          <Route path="/Customerfeedback" element={<Customerfeedback />} />
          <Route path="/Servicefeedback" element={<Servicefeedback />} />
          <Route path="/Adcreate" element={<Adcreate />} />
          <Route path="/Sellers" element={<Sellers />} />
          <Route path="/Customers" element={<Customers />} />        
          <Route path="/fetch" element={<Fetch />} />        
          <Route path="/Logout" element={<Logout />} />        
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
