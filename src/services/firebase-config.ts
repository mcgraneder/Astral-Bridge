// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATS0AOp-kUGRZljrIWEdCNdWDdEzBGEQM",
  authDomain: "astral-bridge.firebaseapp.com",
  projectId: "astral-bridge",
  storageBucket: "astral-bridge.appspot.com",
  messagingSenderId: "670712614894",
  appId: "1:670712614894:web:3a3562790815eac7aa08ff",
  measurementId: "G-T91EFL4NH4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);