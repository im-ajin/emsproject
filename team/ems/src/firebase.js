// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rental-mern.firebaseapp.com",
  projectId: "rental-mern",
  storageBucket: "rental-mern.appspot.com",
  messagingSenderId: "168997615894",
  appId: "1:168997615894:web:f653641dd9c10d7230f837"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
