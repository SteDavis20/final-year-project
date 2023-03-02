import { FIREBASE_API_KEY } from "./firebaseApiKey";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "final-year-project-2d4e9.firebaseapp.com",
  projectId: "final-year-project-2d4e9",
  storageBucket: "final-year-project-2d4e9.appspot.com",
  messagingSenderId: "1059122879027",
  appId: "1:1059122879027:web:b07c1a328cfdc6bf6ae146",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
