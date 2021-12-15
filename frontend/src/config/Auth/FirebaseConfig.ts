import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './settings';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();