import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 
import { getAuth } from "firebase/auth"; 
 

const firebaseConfig = {
    apiKey: "AIzaSyDV398gjRIhG0h08QvV71cVE2NhZNnQC74",
    authDomain: "shubhbandhan-ac671.firebaseapp.com",
    projectId: "shubhbandhan-ac671",
    storageBucket: "shubhbandhan-ac671.appspot.com",
    messagingSenderId: "926569658788",
    appId: "1:926569658788:web:f4732bb18de7c30c05a931",
    measurementId: "G-45L9GNRJT0"
  };
  
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 
const storage = getStorage(app);
const auth = getAuth(app); 

export { db, storage, auth };
 