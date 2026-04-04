import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTH74lTpnp9nbJejA6nOXYIG75_ECGjKI",
  authDomain: "pseudo-help.firebaseapp.com",
  projectId: "pseudo-help",
  storageBucket: "pseudo-help.firebasestorage.app",
  messagingSenderId: "902400672433",
  appId: "1:902400672433:web:2f31ed40bff11b0cd59890",
  measurementId: "G-HMH4VZQGHK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };