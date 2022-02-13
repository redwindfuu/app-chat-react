import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC_6aYu2NtdFTIVkU503fh3saESFxUItIA",
  authDomain: "chat-app-87044.firebaseapp.com",
  projectId: "chat-app-87044",
  storageBucket: "chat-app-87044.appspot.com",
  messagingSenderId: "102712485419",
  appId: "1:102712485419:web:fdeb931fb030d7f4cd6c6e",
  measurementId: "G-PT4ZR486HY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)
export { analytics , db , auth}