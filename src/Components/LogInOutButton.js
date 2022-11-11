import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../firebase";
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