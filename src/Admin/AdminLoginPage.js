import React from "react";
import { Login, LoginForm } from "react-admin";

//TODO: Wait for version 7.0.0 to be released :/
//i.e. merge of https://github.com/firebase/firebaseui-web-react/pull/173
//npm install --save react-firebaseui
//import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/compat/app";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '#/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // Optional callbacks in order to get Access Token from Google,Facebook,... etc
    callbacks: {
        signInSuccessWithAuthResult: (result) => {
            const credential = result.credential;
            // The signed-in user info.
            const user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const accessToken = credential.accessToken;
            console.log({ result, user, accessToken });
        }
    }
};

/*
function SignInScreen() {
    return (
        <StyledFirebaseAuth 
            firebaseAuth={firebase.auth()}
            uiConfig={uiConfig} />
    );
}*/

function AdminLoginForm(props) {
    return (
        <div style={{textAlign: "center"}}>
            <h4 style={{fontFamily: "monospace"}}>Admin Login</h4>
            <LoginForm {...props} />
        </div>
    );
    //<SignInScreen />
}

function AdminLoginPage(props) {
    return (
        <Login {...props}>
            <AdminLoginForm {...props} />
        </Login>
    );
}

export default AdminLoginPage;