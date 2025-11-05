import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Signup with email & password
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Login with email & password
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google Sign-in
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logout = () => signOut(auth);

  // Track current user & get Firebase token
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => { 
      setCurrentUser(user); 
    }); 
    return () => unsub(); 
  }, []);

  return ( 
    <AuthContext.Provider 
    value={{ currentUser, signup, login, logout, googleSignIn }} 
    > 
      {children} 
    </AuthContext.Provider> 
  ); 
}
