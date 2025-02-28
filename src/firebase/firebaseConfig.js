import firebase from 'firebase/compat/app';


import 'firebase/compat/firestore';



import { getFirestore } from 'firebase/firestore';


//require("dotenv").config()

const app = firebase.initializeApp({
    apiKey: "AIzaSyBHgG4mwWSEUBLPS1p2XFtaC8GwPIv2xN8",
  authDomain: "arquidiocesishermosillo-776dd.firebaseapp.com",
  projectId: "arquidiocesishermosillo-776dd",
  storageBucket: "arquidiocesishermosillo-776dd.appspot.com",
  messagingSenderId: "767127814821",
  appId: "1:767127814821:web:6c159d62075bcd1271c34c"
});


export const firestoreDB = getFirestore(app);

