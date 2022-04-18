import React from 'react';
import ReactDOM from 'react-dom/client';
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
import {Customerfeedback} from './Components/Customerfeedback'
import {Servicefeedback} from './Components/Servicefeedback'
import { Adcreate } from "./Components/Adcreate";
import { Sellers } from "./Components/Sellers"
import { Customers } from "./Components/Customers"
import "./index.css";

import reportWebVitals from './reportWebVitals';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";


i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18next}>
  <div>
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
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </div>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
