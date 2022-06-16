
/* Client (navigator) settings */

import React, { createContext, useState, useEffect } from "react";

//Log-in information from firebase
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//User context
const UserContext = createContext();

function UserProvider(props) {
	const [userData, setUserData] = useState({
		"user_id": null,
		"loaded": false,
		"display_name": "Guest"
	});
	const updateUserData = data => setUserData(prev => Object.assign(Object.assign({}, prev), data));
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (!loading) {
			if (user)
				updateUserData({
					"user_id": user.uid,
					"display_name": user.displayName || user.email || "User"
				});
			else
				updateUserData({
					"user_id": null,
					"display_name": "Guest"
				});
		}
		updateUserData({"loaded": !loading});
	}, [user, loading]);

	return (
		<UserContext.Provider value={{userData, setUserData, updateUserData}}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProvider };
