import { useState, useEffect, createContext } from "react";
import { auth, db } from "../config/firebase";
import { query, collection, where, getDocs} from "firebase/firestore";

export const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    const fetchUser = async (userID) => {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("userID", "==", userID));
        const results = getDocs(userQuery);
        await results.then(docs => {
            docs.forEach(doc => {
                setUserProfile(doc.data());
            })
        }).catch(err => {
            console.error(err.message);
            setUserProfile(null);
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                fetchUser(authUser.uid)
            } else {
                setUserProfile(null);
            }
        });

        return () => unsubscribe();
    }, [])

    return (
        <UserProfileContext.Provider value={userProfile}>
            {children}
        </UserProfileContext.Provider>
    );
}

