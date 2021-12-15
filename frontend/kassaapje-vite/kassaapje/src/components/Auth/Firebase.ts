import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCmPq9osI-a4PxpJSef0x18hVssTIotiNI",
  authDomain: "kassaapje-auth.firebaseapp.com",
  projectId: "kassaapje-auth",
  storageBucket: "kassaapje-auth.appspot.com",
  messagingSenderId: "832367682286",
  appId: "1:832367682286:web:0933770bfabf91a72a89ff"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();