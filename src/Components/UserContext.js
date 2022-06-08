
/* Client (navigator) settings */

import React, { createContext, useState, useEffect } from "react";

//Log-in information from firebase
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//User context
const UserContext = createContext();

function UserProvider(props) {
	const userData = useState({
		"user_id": null,
		"display_name": "Guest"
	});
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (!loading) {
			const [uD, sUD] = userData;
			console.log("Is here", user);

			sUD(Object.assign(Object.assign({}, uD), {
				"user_id": user.uid,
				"display_name": user.displayName || user.email || "Guest"
			}));
		}
	}, [user, loading]);

	return (
		<UserContext.Provider value={userData}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProvider };
