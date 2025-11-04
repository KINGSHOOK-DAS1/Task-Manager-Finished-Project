import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getIdToken, // 🆕 to get Firebase JWT token
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null); // 🆕 Store JWT for backend auth
  const [loading, setLoading] = useState(true);

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
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setToken(null);
  };

  // Track current user & get Firebase token
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const idToken = await user.getIdToken(); // 🆕 get Firebase token
        setToken(idToken);
      } else {
        setCurrentUser(null);
        setToken(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token, // 🆕 exposed to frontend (use for authenticated API calls)
        signup,
        login,
        logout,
        googleSignIn,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
