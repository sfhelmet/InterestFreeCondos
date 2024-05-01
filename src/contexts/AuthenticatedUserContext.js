import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../config/firebase";
import { query, collection, where, getDocs} from "firebase/firestore";

export const AuthenticatedUserContext = createContext(null);

export const AuthenticatedUserProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState({
        email: "",
        phone: "",
        profilePic: "",
        userID: "",
        userName: "",
        userType: "",
    });

    const fetchUser = async (userID) => {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("userID", "==", userID));
        const results = getDocs(userQuery);
        await results.then(docs => {
            docs.forEach(doc => {
                setAuthenticatedUser(doc.data());
            })
        }).catch(err => {
            console.error(err.message);
            setAuthenticatedUser(null);
        })
    }

    const updateAuthenticatedUser = (user) => {
        setAuthenticatedUser(user);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                await fetchUser(authUser.uid)
            } else {
                setAuthenticatedUser(null);
            }
        });

        return () => unsubscribe();
    },[])

    return (
        <AuthenticatedUserContext.Provider value={{ authenticatedUser, updateAuthenticatedUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
}

export const useAuthenticatedUserContext = () => {
    const context = useContext(AuthenticatedUserContext);
    if (!context) {
      throw new Error('useMyData must be used within a MyDataProvider');
    }
    return context;
} 

export default AuthenticatedUserContext;