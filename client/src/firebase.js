import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAdTIaBWpVVw8oWlYpwm1iynZ_ZR2q4AUU",
  authDomain: "gqlreactnode-80ce6.firebaseapp.com",
  projectId: "gqlreactnode99",
  storageBucket: "gqlreactnode-80ce6.appspot.com",
  appId: "1:60096531633:web:7ad3cbae5731efea26e690",
  measurementId: "G-SF1DDK5065"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// console.log(firebase.auth())

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
