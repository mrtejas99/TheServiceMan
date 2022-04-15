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
import "./index.css";

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Navigation />  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgotpass" element={<Forgotpass/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
