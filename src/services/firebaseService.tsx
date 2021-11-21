// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateCurrentUser,
    User,
    UserCredential,
} from "firebase/auth";
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyDfPPrmWRBCi0KAyRSYS4nrygKXGBREUzE",
    authDomain: "mytsproject-55492.firebaseapp.com",
    projectId: "mytsproject-55492",
    storageBucket: "mytsproject-55492.appspot.com",
    messagingSenderId: "55615284071",
    appId: "1:55615284071:web:5fc17d18b92c64729685c2"
};

// Initialize Firebase
let app: FirebaseApp;

export const initFirebase = (callback: (_: boolean) => void) => {
    app = firebase.initializeApp(firebaseConfig);
    firebase.firestore();

    const auth = getAuth();
    auth.onAuthStateChanged((state) => {
        if (state) {
            callback(true); //current user signed in
        } else {
            callback(false); //current user NOT signed in
        }
    });
};

export const fbRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
): Promise<UserCredential> => {
    const auth = getAuth(app);

    const createUserResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    return createUserResponse;
};

export const fbLogout = async () => {
    const auth = getAuth(app);
    await auth.signOut();
};

export const fbLogin = async (
    email: string,
    password: string
): Promise<UserCredential | undefined> => {
    const auth = getAuth(app);

    try {
        return await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    } catch (error) {
        return undefined;
    }
};
export default firebase;
