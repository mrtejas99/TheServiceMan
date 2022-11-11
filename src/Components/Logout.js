
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {  logout } from "../firebase";

function Logout() {
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