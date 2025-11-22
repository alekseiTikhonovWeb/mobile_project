// Import the functions you need from the SDKs you need
import { initializeApp, getApps,getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDVNwK-3jWswNCH1t7T7HVoCFjTPElN90",
  authDomain: "e-commerce-firebase-998bb.firebaseapp.com",
  databaseURL: "https://e-commerce-firebase-998bb-default-rtdb.firebaseio.com",
  projectId: "e-commerce-firebase-998bb",
  storageBucket: "e-commerce-firebase-998bb.firebasestorage.app",
  messagingSenderId: "514277672590",
  appId: "1:514277672590:web:57d7287faf06e49a922bdf",
  measurementId: "G-NHJQVEJ4WN"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { auth };