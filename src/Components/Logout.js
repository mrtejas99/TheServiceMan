
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { Form, Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, logout } from "../firebase";

function Logout() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) {
            logout()
            .then(() => navigate("/login"))
            .catch((msg) => {
                navigate("/login");
            });
        }
        else
            navigate("/");

    }, [user, loading]);
    
    return;
}

export { Logout };