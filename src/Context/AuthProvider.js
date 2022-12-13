import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { createContext } from "react";
import app from '../firebase/firebase.config';

export const authContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const GoogleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = profile => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })

        return () => unsubscribe();
    }, [])
    const authInfo =
    {
        user,
        loading,
        createUser,
        logIn,
        GoogleSignIn,
        updateUser,
        logOut

    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider >
    );
};

export default AuthProvider;

