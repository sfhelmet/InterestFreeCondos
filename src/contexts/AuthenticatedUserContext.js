import { useState, useEffect, createContext } from "react";
import { auth, db } from "../config/firebase";
import { query, collection, where, getDocs} from "firebase/firestore";

export const AuthenticatedUserContext = createContext(null);

export const AuthenticatedUserProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

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
                fetchUser(authUser.uid)
            } else {
                setAuthenticatedUser(null);
            }
        });

        return () => unsubscribe();
    }, [])

    return (
        <AuthenticatedUserContext.Provider value={{ authenticatedUser, updateAuthenticatedUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
}

export default AuthenticatedUserContext;