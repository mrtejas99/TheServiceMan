
import React, { Suspense } from 'react';	//for i18n

import { BrowserRouter, Route, Routes } from "react-router-dom";

//User settings context
import { ClientSettingsProvider } from './Components/ClientSettings';

//Theme manager
import { BoostrapTheme, BootswatchTheme } from './Components/AppTheme';
import './App.css';

//Pages
import { Home } from './Components/Home';
import { Navigation } from './Components/Navigation';
import { Footer } from './Components/Footer';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Error } from './Components/Error';
import { Forgotpass } from "./Components/Forgotpass";
import { Userprofile } from "./Components/Userprofile";
import { Adview } from './Components/Adview';
import { Customerfeedback } from './Components/Customerfeedback';
import { Servicefeedback } from './Components/Servicefeedback';
import { Adcreate } from "./Components/Adcreate";
import { Sellers } from "./Components/Sellers";
import { Customers } from "./Components/Customers";
import { Fetch } from "./Components/temp";
import { Logout } from "./Components/Logout";

//Admin dashboard
import AdminPanel from './AdminPanel';

/**
 * Main Application
 */
function TheServiceManApp() {
	return (
		<div className='app' >
			<BoostrapTheme lightModeTheme={BootswatchTheme.FLATLY} darkModeTheme={BootswatchTheme.DARKLY} />
			<Navigation />
			<Routes>
				<Route exact path='/' element={<Home/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/forgotpass" element={<Forgotpass/>} />
				<Route path="/Userprofile" element={<Userprofile/>} />
				<Route path="/Adview/:id" element={<Adview/>} />
				<Route path="/Customerfeedback" element={<Customerfeedback />} />
				<Route path="/Servicefeedback" element={<Servicefeedback />} />
				<Route path="/Adcreate" element={<Adcreate />} />
				<Route path="/Sellers" element={<Sellers />} />
				<Route path="/Customers" element={<Customers />} />
				<Route path="/fetch" element={<Fetch />} />
				<Route path="/Logout" element={<Logout />} />
				<Route path="*" element={<Error/>} />
			</Routes>
			<Footer />
		</div>
	);
}

/**
 * Application Entry-point: Router for Main App and Admin Dashboard App
 */
function App() {
	return (
		<Suspense fallback={"Loading..."}>
			<ClientSettingsProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/*" element={<TheServiceManApp />} />
						<Route path="/admin/*" element={<AdminPanel />} />
					</Routes>
				</BrowserRouter>
			</ClientSettingsProvider>
		</Suspense>	
	);
}

export default App;
