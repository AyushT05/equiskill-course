// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "skill-ai-151fd.firebaseapp.com",
  projectId: "skill-ai-151fd",
  storageBucket: "skill-ai-151fd.firebasestorage.app",
  messagingSenderId: "1017048241969",
  appId: "1:1017048241969:web:c66650ad2cd2b11ef44210",
  measurementId: "G-QYFS428VMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage();