import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE5Ujgkv-5AvRDJiqnh02xJFlvQL8Sc8U",
    authDomain: "react-crm-fcedc.firebaseapp.com",
    projectId: "react-crm-fcedc",
    storageBucket: "react-crm-fcedc.firebasestorage.app",
    messagingSenderId: "765352872941",
    appId: "1:765352872941:web:2e7ef1b5b9a54c32ea35e4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);