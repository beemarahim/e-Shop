
// import * as firebase from "firebase/app"; // old way, wont work anymore

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/database'

// firebase config
const config = {
  apiKey: "AIzaSyD7shvV2CVh3p97GAiXq7j0yultstt39tU",
  authDomain: "e-shop-de5a2.firebaseapp.com",
  projectId: "e-shop-de5a2",
  storageBucket: "e-shop-de5a2.appspot.com",
  messagingSenderId: "484359330264",
  appId: "1:484359330264:web:d0bee4cc016b391b263aad"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();