import { useState } from "react";
import { auth, db } from "../config/firebase";
import { query, collection, where, getDocs} from "firebase/firestore" 
import { useEffect } from "react";

const Profile = () => {
    const [currentAuthUser] = useState(auth.currentUser);
    const [userProfile, setUserProfile] = useState(null);
    
    useEffect(() => {
        if (!userProfile && auth.currentUser) {
            const usersRef = collection(db, "users");
            const userQuery = query(usersRef, where("userID", "==", currentAuthUser.uid));
            const results = getDocs(userQuery);
            results.then(docs => {
                docs.forEach(doc => {
                    setUserProfile(doc.data());
                })
            })
        }
    })

    return (
        <div>
            <h1>User Name: { userProfile ? userProfile.userName : ""}</h1>
            <h3>Contact Email: { userProfile ? userProfile.email : ""}</h3>
            <h3>Phone number: { userProfile ? userProfile.phone : ""}</h3>
        </div>
    )
}

export default Profile;