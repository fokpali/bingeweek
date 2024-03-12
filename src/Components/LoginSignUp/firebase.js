// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyDFVr_o9h1UCaAu-COL7WXghrH2r7PtJpI",
  authDomain: "named-sunset-304215.firebaseapp.com",
  projectId: "named-sunset-304215",
  storageBucket: "named-sunset-304215.appspot.com",
  messagingSenderId: "961165430451",
  appId: "1:961165430451:web:9e93e32bf1842a56812ac6",
  measurementId: "G-WTH9VLQE2K"
};
firebase.initializeApp(firebaseConfig);

// Export Firebase services if needed
export const auth = firebase.auth();
export const firestore = firebase.firestore();