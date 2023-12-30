import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVBRuXlh4CQxCtu_r06SL4RSCjIuu3VJ0",
  authDomain: "moeen-129e5.firebaseapp.com",
  projectId: "moeen-129e5",
  storageBucket: "moeen-129e5.appspot.com",
  messagingSenderId: "175718192356",
  appId: "1:175718192356:web:3bb215877ef3a46bb488f1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
