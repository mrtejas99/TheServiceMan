//Configure the Firebase App
const firebaseConfig = {
    apiKey: "<API Key>",
    projectId: "<Project-id>",
    appId: "<App ID>",
    authDomain: "<Firebase Auth server URL>",
    storageBucket: "<Firebase Storage server URL>",
    messagingSenderId: "<Sender ID>"
};

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

export { firebaseConfig, firebaseEmulatorConfig };
