// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKB0pJvanJLpEe4B3PT1gd2d6-BMZbDPE",
  authDomain: "dat-s-blog.firebaseapp.com",
  projectId: "dat-s-blog",
  storageBucket: "dat-s-blog.appspot.com",
  messagingSenderId: "201137756158",
  appId: "1:201137756158:web:43edf5a79d6b1bb4ac12af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
