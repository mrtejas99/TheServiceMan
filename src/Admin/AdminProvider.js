
import {
    FirebaseAuthProvider,
    FirebaseDataProvider
} from 'react-admin-firebase';

import { firebaseConfig, adminConfig } from '../config';

const dataOptions = {
	logging: adminConfig.raf_logging || false,
	//watch: ['serviceads'],
	//dontwatch: [],
	persistence: adminConfig.auth_storage || 'local',
	// disableMeta: true
	dontAddIdFieldToDoc: true,
	lazyLoading: {
		enabled: true,
	},
	firestoreCostsLogger: {
		enabled: true,
	}
};

const authOptions = {
	logging: adminConfig.raf_logging || false,
	persistence: adminConfig.auth_storage || 'local'
};

//Data provider
const dataProvider = FirebaseDataProvider(firebaseConfig, dataOptions);

//Default auth provider. DON'T USE THIS, ANYONE CAN AUTHENTICATE AS ADMIN!!
const authProvider = FirebaseAuthProvider(firebaseConfig, authOptions);

/* Makes sure the user currently logged in has Admin privileges */
const validateAdmin = async () => {
	const claims = await authProvider.getPermissions();

	//User has to have "admin" or "superadmin" role(s)
	const userRoles = claims.roles || null;
	const isAdmin = Array.isArray(userRoles) && (userRoles.includes("admin") || userRoles.includes("superadmin"));

	//If the user is actually assigned the 'admin' role
	if (isAdmin)
		return true;

	/* ---- Not Admin ---- */

	// Make sure user is logged out, if not an Admin
	await authProvider.logout();
	throw new Error("Login error: Invalid permissions");
};

/* Auth provider with validation for Admin privileges */
const adminAuthProvider = {
	...authProvider,
	// Wrap the login and check for custom claims
	login: async (params) => {
		const user = await authProvider.login(params);
		const isAdmin = await validateAdmin();
		if (isAdmin)
			return user;
		//Not admin, return nothing
	},
	checkAuth: async() => {
		const claims = await authProvider.getPermissions();
		const isAdmin = await validateAdmin();
		if (isAdmin)
			return await authProvider.checkAuth();
	}
};

export { dataProvider, authProvider, adminAuthProvider };
