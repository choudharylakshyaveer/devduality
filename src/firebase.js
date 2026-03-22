// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // optional
// import { db } from "./firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDJguarDSeiJfMz5MSdVF0YckkToMZLK9Q",
  authDomain: "devduality-86ddb.firebaseapp.com",
  projectId: "devduality-86ddb",
  storageBucket: "devduality-86ddb.firebasestorage.app",
  messagingSenderId: "966675232190",
  appId: "1:966675232190:web:09e485e0b34bc1d8bdb5ef",
  measurementId: "G-Z468RQM9QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services (use only what you need)
export const auth = getAuth(app);
export const db = getFirestore(app);

// export const analytics = getAnalytics(app); // ONLY if needed

export default app;