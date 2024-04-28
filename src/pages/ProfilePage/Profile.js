import { useState, useEffect, useContext, useCallback } from "react";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import MyAccount from "./MyAccount/MyAccount";
import { CloudUpload } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";

import "./Profile.css";
import { doc, updateDoc } from "firebase/firestore";
import Center from "../../components/Utils/Center";

const Profile = () => {
    const { authenticatedUser: currentUser, updateAuthenticatedUser } = useContext(AuthenticatedUserContext);
    const [profilePicURL, setProfilePicURL] = useState(null);
    
    //CSS overrides
    const hoverBtnOverrides = { ":hover": { bgcolor: "#193446", color: "white !important"}};

    const handleProfilePictureUpload = async (e) => {
        const file = e.target.files[0];
        const uploadRef = ref(storage, `profile_pictures/${file.name}`);

        await uploadBytes(uploadRef, file)
            .then(() => {
                console.log("File uploaded!");
            })
            .catch(err => {
                console.log("Error occurred while uploading profile picture");
                console.error(err.message);
            })

        await updateDoc(doc(db,"users", currentUser.userID), {
            ...currentUser,
            profilePic: file.name.toString()
        });

        updateAuthenticatedUser({ ...currentUser, profilePic: file.name.toString() });
        fetchUserProfilePicture();
    }

    const fetchUserProfilePicture = useCallback(() => {
        const profilePictureRef = ref(storage, `profile_pictures/${currentUser.profilePic}`);

        getDownloadURL(profilePictureRef)
            .then((url) => {
                console.log("URL fetched");
                setProfilePicURL(url);
            })
            .catch(err => {
                console.error(err.message);
            })
    }, [currentUser]);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        if (currentUser) {
            fetchUserProfilePicture();
        }
    }, [currentUser, fetchUserProfilePicture]);

    return (
        <Center>
            <Box className="user-profile-container">
                <Box className="image-options-wrapper">
                    <Box className="profile-img-box thin-border">
                        <Avatar className="profile-avatar" src={profilePicURL ?? null}>
                            {currentUser && !profilePicURL ? (currentUser.userName ?? "N/A") : null}
                        </Avatar>
                        <Typography className="profile-name">{currentUser ? currentUser.userName : ""}</Typography>
                        <Button
                            component="label"
                            className="upload-btn"
                            startIcon={<CloudUpload/>}
                        >
                            Update Picture
                            <VisuallyHiddenInput 
                                type="file" 
                                onChange={handleProfilePictureUpload}
                                accept=".png,.jpg,.jpeg"
                            />
                        </Button>
                    </Box>
                    <Box className="options-stack thin-border">
                        <Box className={`stack-option-container`}>
                            <Button 
                                sx={hoverBtnOverrides} 
                                className={`stack-option-btn currently-selected`}
                            >
                                My Account
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box className="selected-stack-option-wrapper thin-border">
                    <Box className="selected-stack-option-container">
                        <MyAccount/>
                    </Box>
                </Box>
            </Box>
        </Center>
    )
}

export default Profile;