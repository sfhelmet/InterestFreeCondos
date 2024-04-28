import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthenticatedUserContext from '../../../contexts/AuthenticatedUserContext';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

import "./MyAccount.css";

const MyAccount = () => {
    const { authenticatedUser: currentUser, updateAuthenticatedUser } = useContext(AuthenticatedUserContext);
    const [userName, setUserName] = useState(currentUser && currentUser.userName ? currentUser.userName : "N/A");
    const [userPhone, setUserPhone] = useState(currentUser && currentUser.phone ? currentUser.phone : "N/A");

    const [userFetched, setUserFetched] = useState(false);
    const fontFamilyOverride = { fontFamily: "inherit" };

    const handleSaveClick = async () => {
        await updateDoc(doc(db,"users", currentUser.userID), {
            ...currentUser,
            userName: userName,
            phone: userPhone
        });
        
        updateAuthenticatedUser({
            ...currentUser,
            userName: userName,
            phone: userPhone
        });
    }

    const handleDiscardClick = () => {
        setUserName(currentUser.userName);
        setUserPhone(currentUser.phone ?? "N/A");
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleUserPhoneChange = (e) => {
        setUserPhone(e.target.value);
    }

    useEffect(() => {
        if (!userFetched && currentUser) {
            const fetchUser = async () => {
                const usersRef = collection(db, "users");
                const userQuery = query(usersRef, where("userID", "==", currentUser.userID));
                const results = getDocs(userQuery);
                await results.then(docs => {
                    docs.forEach(doc => {
                        updateAuthenticatedUser(doc.data());
                    })
                }).catch(err => {
                    console.error(err.message);
                });
            };
            fetchUser();
            setUserFetched(true);
        }

        if (userFetched) {
            setUserName(currentUser.userName);
            setUserPhone(currentUser.phone ?? "N/A");
        }
    },[userFetched, currentUser, updateAuthenticatedUser]);

    return (
        <Box className={"myaccount-container"}>
            <Box className="title-buttons-container">
                <Typography 
                    sx={fontFamilyOverride} 
                    className="stack-option-title"
                    variant="h4"
                >
                    Account
                </Typography>
            </Box>
            <Typography
                className="stack-option-subtitle"
                sx={fontFamilyOverride}
                variant="subtitle1"
            >
                View and edit your account information below
            </Typography>
            <div className="separator"/>
            <Box className="info-container">
                <Typography
                    className="stack-option-title "
                    sx={fontFamilyOverride}
                    variant="h6"
                >
                    Account
                </Typography>
                <Typography
                    className="stack-option-subtitle"
                    sx={fontFamilyOverride}
                    variant="subtitle1"
                >
                    Update your account information below.
                </Typography>
                <Typography
                    sx={fontFamilyOverride}
                    className="edit-note"
                    variant="body1"
                >
                    Note: Certain information cannot be edited.
                </Typography>
                <Box className="user-info horizontal">
                    <Box className="vertical">
                        <label>User Name</label>
                        <TextField 
                            size="small" 
                            className="userName field-input"
                            onChange={handleUserNameChange}
                            value={userName}
                        />
                    </Box>
                    <Box className="vertical">
                        <label>User Type</label>
                        <TextField 
                            size="small" 
                            className="userType field-input"
                            disabled={true}
                            value={currentUser && currentUser.userType ? currentUser.userType : "N/A"}
                        />
                    </Box>
                </Box>
                <Box className="contact-info horizontal">
                    <Box className="vertical">
                        <label>Email</label>
                        <TextField 
                            size="small" 
                            className="email field-input"
                            value={currentUser && currentUser.email ? currentUser.email : "N/A"}
                            disabled={true}
                        />
                    </Box>
                    <Box className="vertical">
                        <label>Phone</label>
                        <TextField 
                            size="small" 
                            className="phone field-input"
                            onChange={handleUserPhoneChange}
                            value={userPhone}
                        />
                    </Box>
                </Box>
            </Box>
            <Box className="btns-container force-flex-right">
                <Button
                    sx={fontFamilyOverride}
                    variant="outlined"
                    className="discard-btn"
                    onClick={handleDiscardClick}
                >
                    Discard
                </Button>
                <Button
                    sx={fontFamilyOverride}
                    variant="contained"
                    className="save-btn"
                    onClick={handleSaveClick}
                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
}

export default MyAccount;