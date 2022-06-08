//Configure the Firebase App
const firebaseConfig = {
    apiKey: "<API Key>",
    projectId: "<Project-id>",
    appId: "<App ID>",
    authDomain: "<Firebase Auth server URL>",
    storageBucket: "<Firebase Storage server URL>",
    messagingSenderId: "<Sender ID>"
};

//Note: Set this to false when ready to use the online version!
const enableLocalEmulator = true;

//See firebase.json and the emulator console for the port numbers
const firebaseEmulatorConfig = {
    "auth": {
        "url": "http://localhost:9099"
    },
    "firestore": {
        "host": "localhost",
        "port": 8080
    },
    "storage": {
        "host": "localhost",
        "port": 9199
    }
};

const adminConfig = {
	//Enable Logging from React-admin-firebase (in console)
	"raf_logging": false,
	//How the admin session is stored: 'session', 'local' or 'none'
	"auth_storage": 'local'
};

export { firebaseConfig, enableLocalEmulator, firebaseEmulatorConfig, adminConfig };
