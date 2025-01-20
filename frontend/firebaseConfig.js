import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBfUtvrkvwQ9UpZAykMDmYzw2yc6pmazs8",
  authDomain: "finddownsyndrome.firebaseapp.com",
  projectId: "finddownsyndrome",
  storageBucket: "finddownsyndrome.appspot.com",
  messagingSenderId: "663661373594",
  appId: "1:663661373594:web:b1e3eaaec00aa64fd45723",
  measurementId: "G-VHKX6FLD5R"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);


export { app, auth, firestore, storage,database };