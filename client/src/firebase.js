// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-9f6b9.firebaseapp.com",
  projectId: "mern-auth-9f6b9",
  storageBucket: "mern-auth-9f6b9.appspot.com",
  messagingSenderId: "511130309879",
  appId: "1:511130309879:web:316bd193d21e4424132ff2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);