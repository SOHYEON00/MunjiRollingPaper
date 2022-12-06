import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mungi-rollingpaper.firebaseapp.com",
  projectId: "mungi-rollingpaper",
  storageBucket: "mungi-rollingpaper.appspot.com",
  messagingSenderId: "21391522725",
  appId: process.env.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
