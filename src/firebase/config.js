
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBWjeE9Lhcudctnz0NeMxlES1-fzsacG5Y",
  authDomain: "miniblog-8be4c.firebaseapp.com",
  projectId: "miniblog-8be4c",
  storageBucket: "miniblog-8be4c.appspot.com",
  messagingSenderId: "710937223017",
  appId: "1:710937223017:web:62ab299e48718d723327f8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }