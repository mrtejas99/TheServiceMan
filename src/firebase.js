import {
    GoogleAuthProvider,
    getAuth,
    connectAuthEmulator,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    connectFirestoreEmulator,
    query,
    getDocs,
    collection,
    where,
    addDoc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig, enableLocalEmulator, firebaseEmulatorConfig as fbEmu } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//to use the emulator
if (enableLocalEmulator) {
    connectAuthEmulator(auth, fbEmu.auth.url);
    connectFirestoreEmulator(db, fbEmu.firestore.host, fbEmu.firestore.port);
    connectStorageEmulator(storage, fbEmu.storage.host, fbEmu.storage.port);
}

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (fname, lname, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            fname,
            lname,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

const saveAdData = async (
    user,
    title,
    banner,
    description,
    experience,
    skills,
    location,
    language,
    category) => {
    try {
        const docRef = await addDoc(collection(db, "serviceads"), {
            posted_by: user,
            title: title,
            banner_url: banner,
            description: description,
            experience: experience,
            skills: skills,
            location: location,
            language: language,
            category: category,
            posted_date: Date.now(),
            rating:0,
            feedback_count:0
        });
        alert("Document written with ID: ", docRef.id);
    } catch (e) {
        alert("Error adding document: ", e);
    }
};

export {
    firebaseConfig,
    auth,
    db,
    storage,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    saveAdData,
};