import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2UKJeYLyXDOUEFnjJSks0DDEeNHyiOHk",
    authDomain: "chat-box-9c822.firebaseapp.com",
    projectId: "chat-box-9c822",
    storageBucket: "chat-box-9c822.appspot.com",
    messagingSenderId: "303455746128",
    appId: "1:303455746128:web:b61a0caad69003762a7955",
    measurementId: "G-EYTB50D2RP"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth , provider}
  export default db;