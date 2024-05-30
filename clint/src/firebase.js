// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-21ec2.firebaseapp.com",
  projectId: "mern-blog-21ec2",
  storageBucket: "mern-blog-21ec2.appspot.com",
  messagingSenderId: "153778562422",
  appId: "1:153778562422:web:9dc14afe7dbf9f7d3ac657"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
