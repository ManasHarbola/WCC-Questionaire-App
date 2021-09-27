import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDoc } from "firebase/firestore"



const firebaseApp = initializeApp({
    apiKey: "AIzaSyDV2JzOsW4P2OCK3WUsdQsq7sA6JbfMjRo",
    authDomain: "code-for-good-2021.firebaseapp.com",
    projectId: "code-for-good-2021",
    storageBucket: "code-for-good-2021.appspot.com",
    messagingSenderId: "707476657475",
    appId: "1:707476657475:web:9145e380f37e258c3f4bf6",
    measurementId: "G-V6F465T537"
});

export const db = getFirestore();


