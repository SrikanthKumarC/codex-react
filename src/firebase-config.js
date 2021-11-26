import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBGtTGxH_6VPZUKD4yw9S3fYkEfEHtB-N4",
    authDomain: "hexagon-49bcb.firebaseapp.com",
    projectId: "hexagon-49bcb",
    storageBucket: "hexagon-49bcb.appspot.com",
    messagingSenderId: "895025655512",
    appId: "1:895025655512:web:1d6cdb31134bf24659b1ad",
    measurementId: "G-BWQ7THS956"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)