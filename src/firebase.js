// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-aaHAPFlMALgAA7kwglEZAgtVi7pIu-Y",
  authDomain: "utility-imran.firebaseapp.com",
  projectId: "utility-imran",
  storageBucket: "utility-imran.appspot.com", // ⚠️ অবশ্যই ".appspot.com"
  messagingSenderId: "691609650188",
  appId: "1:691609650188:web:c520678071f65d40d2da29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth instance
export const auth = getAuth(app);

// ✅ Google Auth Provider export করা হলো
export const googleProvider = new GoogleAuthProvider();
