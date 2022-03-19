import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA8OyPdUc1LWFyKaYntFpSR8iYbY8ELZGw",
  authDomain: "signal-clone-54a16.firebaseapp.com",
  projectId: "signal-clone-54a16",
  storageBucket: "signal-clone-54a16.appspot.com",
  messagingSenderId: "646264756186",
  appId: "1:646264756186:web:947deecbaccd180a5592e3"
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export {db,auth};