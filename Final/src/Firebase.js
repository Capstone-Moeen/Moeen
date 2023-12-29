import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBVBRuXlh4CQxCtu_r06SL4RSCjIuu3VJ0",
  authDomain: "moeen-129e5.firebaseapp.com",
  projectId: "moeen-129e5",
  storageBucket: "moeen-129e5.appspot.com",
  messagingSenderId: "175718192356",
  appId: "1:175718192356:web:b7b1439bb7749236b488f1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
