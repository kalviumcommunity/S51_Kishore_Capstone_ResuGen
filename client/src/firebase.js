import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCiMGGNE9031aJeZ7J_MyCB5EVT_QjDPnU",
  authDomain: "resu-gen-c74b7.firebaseapp.com",
  projectId: "resu-gen-c74b7",
  storageBucket: "resu-gen-c74b7.appspot.com",
  messagingSenderId: "391321275929",
  appId: "1:391321275929:web:74182f7c3092c785d76488",
  measurementId: "G-VNLVRDVRQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app)