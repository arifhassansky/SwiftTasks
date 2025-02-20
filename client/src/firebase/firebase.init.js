// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7rqjOWjejjGkH5_jXVZ6oLTlGDcYnH4c",
  authDomain: "swifttasks-62795.firebaseapp.com",
  projectId: "swifttasks-62795",
  storageBucket: "swifttasks-62795.firebasestorage.app",
  messagingSenderId: "508195316620",
  appId: "1:508195316620:web:06fbefea7888c54e466ca9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
