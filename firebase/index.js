// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR3EFXcG3p9rkKbmeDfvfa_fWkievwKps",
  authDomain: "shoppinglistapp-8aafb.firebaseapp.com",
  projectId: "shoppinglistapp-8aafb",
  storageBucket: "shoppinglistapp-8aafb.appspot.com",
  messagingSenderId: "359885988767",
  appId: "1:359885988767:web:904da17d0761e629ee93aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, getFirestore, getDocs, doc, updateDoc, deleteDoc};


