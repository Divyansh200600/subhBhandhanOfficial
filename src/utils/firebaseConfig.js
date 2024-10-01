import { initializeApp } from 'firebase/app';
import { getAuth ,GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

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
const auth = getAuth(app);


export const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth , db };