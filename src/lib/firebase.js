import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const app = initializeApp({
  apiKey: "AIzaSyD0W3JcMV8qC1lNpdh5jNrSkpt-Lqy89nc",
  authDomain: "firbasebasic-cd494.firebaseapp.com",
  projectId: "firbasebasic-cd494",
  storageBucket: "firbasebasic-cd494.appspot.com",
  messagingSenderId: "687461870149",
  appId: "1:687461870149:web:e8a4785e99992d9bdd512c",
});
const db = getFirestore(app);
const auth = getAuth(app);
  
export { db, auth, app };
