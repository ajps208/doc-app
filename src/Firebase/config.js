// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-LEU4IYd7EVmOE-sgg1aJPaJBnWhimj0",
  authDomain: "notesin-f1aa6.firebaseapp.com",
  projectId: "notesin-f1aa6",
  storageBucket: "notesin-f1aa6.appspot.com",
  messagingSenderId: "360628014523",
  appId: "1:360628014523:web:496973aa5a2507efe0089e",
  measurementId: "G-DT9EYC727J"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(Firebase);
export const Firestore = getFirestore(Firebase);