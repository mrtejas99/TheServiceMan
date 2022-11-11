//Configure the Firebase App
const firebaseConfig = {
  apiKey: "AIzaSyBP2VPdcstFYifT4Sop53h54BMbX4Ym-jk",
  projectId: "theserviceman-5d308",
  appId: "1:979792316792:web:7f7f7a0d522b2a865c608d",
  authDomain: "theserviceman-5d308.firebaseapp.com",
  storageBucket: "theserviceman-5d308.appspot.com",
  messagingSenderId: "979792316792"
};

//Note: Set this to false when ready to use the online version!
const enableLocalEmulator = false;

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
