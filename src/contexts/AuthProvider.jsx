import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signInWithPopup, signOut ,onAuthStateChanged, updateProfile  } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";



const auth = getAuth(app);

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email, password)
    }

    const signUpWithGmail=()=>{
      return signInWithPopup(auth,googleProvider)
    }

    const login=(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        return signOut(auth)
    }

    const updateUserProfile=(name,photoURL)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photoURL
        })
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              setUser(currentUser)
              setLoading(false)
            } else {
              // User is signed out
              // ...
            }
          });
          
          return ()=>{
            return  unsubscribe()
          }
    },[])


    const authInfo = {
        user, createUser,signUpWithGmail ,login,logOut , updateUserProfile,loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
}


export default AuthProvider;