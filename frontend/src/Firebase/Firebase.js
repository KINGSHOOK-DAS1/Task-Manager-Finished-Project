import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7MIFmsFueRl7Cj23p6XFibw6N6X1by3g",
  authDomain: "task-manager-refined1.firebaseapp.com",
  projectId: "task-manager-refined1",
  storageBucket: "task-manager-refined1.firebasestorage.app",
  messagingSenderId: "720346456561",
  appId: "1:720346456561:web:2b09a95486e867933ea450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);
