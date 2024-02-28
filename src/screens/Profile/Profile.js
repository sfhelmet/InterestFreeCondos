import { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../../contexts/UserProfileContext";
import { Avatar, Box, Button, Typography } from "@mui/material";
import MyAccount from "./MyAccount/MyAccount";

import "./Profile.css";

const Profile = () => {
    const currentUser = useContext(UserProfileContext);
    const [isPublicUser, setIsPublicUser] = useState(true);
    const publicUserOptions = ["My Account"];//Doubles as the options that are available to all users
    const keyRegisteredUserOptions = ["My Condo","My Condo Financials","My Requests","My Reservations"].concat(publicUserOptions);

    const hoverBtnOverrides = { ":hover": { bgcolor: "#193446", color: "white !important"}};

    useEffect(() => {
        setIsPublicUser(false);
    }, []);

    return (
        <Box className="user-profile-container">
            <Box className="image-options-wrapper">
                <Box className="profile-img-box thin-border">
                    <Avatar className="profile-avatar">{currentUser ? currentUser.userName : ""}</Avatar>
                    <Typography className="profile-name">{currentUser ? currentUser.userName : ""}</Typography>
                </Box>
                <Box className="options-stack thin-border">
                    {
                    isPublicUser ? 
                        publicUserOptions.map((option, i) => {
                            return (
                                <Box key={i} className={`stack-option-container ${ i !== publicUserOptions.length-1 ? "thin-lower-border": ''}`}>
                                    <Button sx={hoverBtnOverrides} className="stack-option-btn">{option}</Button>
                                </Box>
                            )
                        })
                     : 
                        keyRegisteredUserOptions.map((option, i) => {
                            return (
                                <Box key={i} className={`stack-option-container ${ i !== keyRegisteredUserOptions.length-1 ? "thin-lower-border": ''}`}>
                                    <Button sx={hoverBtnOverrides} className="stack-option-btn">{option}</Button>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <Box className="selected-stack-option-wrapper thin-border">
                <Box className="selected-stack-option-container">
                    <MyAccount/>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile;