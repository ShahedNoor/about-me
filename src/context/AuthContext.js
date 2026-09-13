"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../lib/firebase";

const ADMIN_EMAIL = "shahednoor32@gmail.com";

const formatAuthError = (err) => {
  if (!err) return null;
  const code = err.code || "";
  
  switch (code) {
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled before completing. Click the button to try again.";
    case "auth/popup-blocked":
      return "Pop-up was blocked by your browser. Please allow pop-ups for this site.";
    case "auth/cancelled-popup-request":
      return "Another sign-in attempt is already in progress.";
    case "auth/network-request-failed":
      return "Network connection issue. Please check your internet connection.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase Console (Authentication > Settings > Authorized domains).";
    default:
      if (err.message) {
        // Strip out verbose "Firebase: Error (auth/...)" prefixes
        return err.message.replace(/^Firebase:\s*Error\s*\((.*?)\)\.?/i, "$1").trim();
      }
      return "An unexpected error occurred during authentication. Please try again.";
  }
};

const AuthContext = createContext({
  user: null,
  loading: true,
  isAdmin: false,
  error: null,
  clearError: () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.email === ADMIN_EMAIL) {
          setUser(currentUser);
          setError(null);
        } else {
          // Non-whitelisted account tried to sign in
          await signOut(auth);
          setUser(null);
          setError(`Access denied. ${currentUser.email} is not authorized as administrator.`);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account"
      });
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setUser(null);
        setError(`Access denied. ${result.user.email} is not authorized.`);
        setLoading(false);
        return false;
      }
      setUser(result.user);
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Google login error:", err);
      setError(formatAuthError(err));
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.email === ADMIN_EMAIL,
        error,
        clearError,
        loginWithGoogle,
        logout,
        adminEmail: ADMIN_EMAIL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
