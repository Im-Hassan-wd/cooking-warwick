import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD92lQEsSMHb713ns7ChvlCdA4CxlhSWH8",
  authDomain: "cooking-warwick.firebaseapp.com",
  projectId: "cooking-warwick",
  storageBucket: "cooking-warwick.appspot.com",
  messagingSenderId: "53324044167",
  appId: "1:53324044167:web:dbda47d61d8edeedfda522",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
export const projectFirestore = firebase.firestore();
