// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDbDAwT9rKHEPYi-dAyvwgCiTwsfGVEDE",
  authDomain: "appjam-27th.firebaseapp.com",
  projectId: "appjam-27th",
  storageBucket: "appjam-27th.appspot.com",
  messagingSenderId: "339900160469",
  appId: "1:339900160469:web:eb35d4630b7bfd4ec0455c",
  measurementId: "G-Y85EJNXDP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };