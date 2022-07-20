 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getFirestore } from "@firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
     apiKey: "AIzaSyCfajaD1MMe-h0BXqYNvNQ3XIV-i41j-8s",
     authDomain: "todo-list-426f0.firebaseapp.com",
     projectId: "todo-list-426f0",
     storageBucket: "todo-list-426f0.appspot.com",
     messagingSenderId: "1043315489533",
     appId: "1:1043315489533:web:f85ab3abaaf657c96adc94",
     measurementId: "G-0WQQB74YGE"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);