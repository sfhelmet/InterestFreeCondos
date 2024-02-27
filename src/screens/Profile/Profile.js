import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { query, collection, where, getDocs} from "firebase/firestore" 
import { useEffect } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

import "./Profile.css";

const Profile = () => {
    const [currentAuthUser] = useState(auth.currentUser);
    const [userProfile, setUserProfile] = useState(null);
    const [isPublicUser, setIsPublicUser] = useState(true);
    const publicUserOptions = ["My Account"];//Doubles as the options that are available to all users
    const keyRegisteredUserOptions = ["My Condo","My Condo Financials","My Requests","My Reservations"].concat(publicUserOptions);

    useEffect(() => {
        if (!userProfile && auth.currentUser) {
            const usersRef = collection(db, "users");
            const userQuery = query(usersRef, where("userID", "==", currentAuthUser.uid));
            const results = getDocs(userQuery);
            results.then(docs => {
                docs.forEach(doc => {
                    setUserProfile(doc.data());
                    setIsPublicUser(false);
                })
            })
        }
    })

    const hoverBtnOverrides = { ":hover": { bgcolor: "#193446", color: "white !important"}};

    return (
        <Box className="user-profile-container">
            <Box className="image-options-wrapper">
                <Box className="profile-img-box thin-border">
                    <Avatar className="profile-avatar">{userProfile ? userProfile.userName : ""}</Avatar>
                    <Typography className="profile-name">{userProfile ? userProfile.userName : ""}</Typography>
                </Box>
                <Box className="options-stack thin-border">
                    {
                    isPublicUser ? 
                        publicUserOptions.map((option, i) => {
                            return (
                                <Box className={`stack-option-container ${ i !== publicUserOptions.length-1 ? "thin-lower-border": ''}`}>
                                    <Button sx={hoverBtnOverrides} className="stack-option-btn">{option}</Button>
                                </Box>
                            )
                        })
                     : 
                        keyRegisteredUserOptions.map((option, i) => {
                            return (
                                <Box className={`stack-option-container ${ i !== keyRegisteredUserOptions.length-1 ? "thin-lower-border": ''}`}>
                                    <Button sx={hoverBtnOverrides} className="stack-option-btn">{option}</Button>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <Box className="selected-stack-option-wrapper thin-border">
                <Box className="selected-stack-option-container">
                    <Typography className="stack-option-title">Acccount overview, editable fields, etc.</Typography>
                </Box>
                <hr/>
                <p>This some text about account</p>
                <p>This some text about account</p>
                <p>This some text about account</p>
                <p>This some text about account</p>
                <p>This some text about account</p>
            </Box>
        </Box>
    )
}

export default Profile;