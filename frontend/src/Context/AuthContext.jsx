import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        return () => unsub()
    }, [])

    return(
        <AuthContext.Provider value={{currentUser, signup, login, logout, googleSignIn}}>
            {children}
        </AuthContext.Provider>
    )

}