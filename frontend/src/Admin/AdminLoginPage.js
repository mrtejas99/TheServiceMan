import React from "react";
import { Login, LoginForm } from "react-admin";

function AdminLoginForm(props) {
    return (
        <div>
            <div style={{fontFamily: "monospace", marginLeft: '15px'}}>
                <p>Username: test@example.com</p>
                <p>Password: password</p>
            </div>
            <LoginForm {...props} />
        </div>
    );
}

function AdminLoginPage(props) {
    return (
        <Login loginForm={<AdminLoginForm />} {...props} />
    );
}

export default AdminLoginPage;