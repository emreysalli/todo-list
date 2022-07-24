 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getFirestore } from "@firebase/firestore";

 const firebaseConfig = {
     apiKey: "AIzaSyCfajaD1MMe-h0BXqYNvNQ3XIV-i41j-8s",
     authDomain: "todo-list-426f0.firebaseapp.com",
     projectId: "todo-list-426f0",
     storageBucket: "todo-list-426f0.appspot.com",
     messagingSenderId: "1043315489533",
     appId: "1:1043315489533:web:f85ab3abaaf657c96adc94",
     measurementId: "G-0WQQB74YGE"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 export { auth, db };