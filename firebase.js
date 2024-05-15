// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXWMOvExXVP8KedhC_pviThEjZs7iEDGw",
  authDomain: "chat-app-6ea10.firebaseapp.com",
  projectId: "chat-app-6ea10",
  storageBucket: "chat-app-6ea10.appspot.com",
  messagingSenderId: "852534948594",
  appId: "1:852534948594:web:4c97ee3d9f5811d43ed66b",
  measurementId: "G-HZQ4TQ3FCH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
