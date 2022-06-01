import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { LoggedIn } from './LoggedIn';
import { LoggedOut } from './LoggedOut';

function LogInOutButton(){
    const [user] = useAuthState(auth);
    if (!user)
        return <LoggedOut />;
    else
        return <LoggedIn />
}

export { LogInOutButton };