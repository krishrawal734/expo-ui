import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGeMDTV6O-Rh06t2W-e62cD1fCI_9ywZg",
  authDomain: "my-expo-app-2da74.firebaseapp.com",
  projectId: "my-expo-app-2da74",
  storageBucket: "my-expo-app-2da74.firebasestorage.app",
  messagingSenderId: "312280399965",
  appId: "1:312280399965:web:f56792febe1d4bac544db4",
  measurementId: "G-99WS3L15QM",
};

const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

export { app, auth };

