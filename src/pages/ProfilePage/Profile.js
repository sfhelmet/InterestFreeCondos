import { useState, useEffect, useContext, useCallback } from "react";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import MyAccount from "./MyAccount/MyAccount";
import { CloudUpload } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

import "./Profile.css";

const Profile = () => {
    const { authenticatedUser: currentUser } = useContext(AuthenticatedUserContext);
    const [profilePicURL, setProfilePicURL] = useState(null);
    const [isPublicUser, setIsPublicUser] = useState(true);
    const publicUserOptions = ["My Account"];//Doubles as the options that are available to all users
    const keyRegisteredUserOptions = ["My Condo","My Condo Financials","My Requests","My Reservations"].concat(publicUserOptions);
    const [currentlySelectedOption, setCurrentlySelectedOption] = useState("My Account");
    
    //CSS overrides
    const hoverBtnOverrides = { ":hover": { bgcolor: "#193446", color: "white !important"}};

    const handleBtnClick = (clickedOption) => {
        setCurrentlySelectedOption(clickedOption);
    }

    const handleProfilePictureUpload = async (e) => {
        const file = e.target.files[0];
        const uploadRef = ref(storage, `profile_pictures/${currentUser.profilePic}`);
        //Uploading code should add a field to the user like profilePicPath
        await uploadBytes(uploadRef, file)
            .then(() => {
                console.log("File uploaded!");
            })
            .catch(err => {
                console.log("Error occurred while uploading profile picture");
                console.error(err.message);
            })
    }

    const fetchUserProfilePicture = useCallback(async () => {
        const profilePictureRef = ref(storage, `profilePictures/${currentUser.profilePic}`);

        await getDownloadURL(profilePictureRef)
            .then((url) => {
                console.log("URL fetched");
                setProfilePicURL(url);
            })
            .catch(err => {
                console.error(err.message);
            })
    }, [currentUser.profilePic]);

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
            setIsPublicUser(false);
            fetchUserProfilePicture();
        }
    }, [currentUser, fetchUserProfilePicture]);

    return (
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
                    {
                    isPublicUser ? 
                        publicUserOptions.map((option, i) => {
                            return (
                                <Box key={i} className={`stack-option-container ${ i !== publicUserOptions.length-1 ? "thin-lower-border": ''}`}>
                                    <Button 
                                        sx={hoverBtnOverrides} 
                                        className={`stack-option-btn ${ currentlySelectedOption === option ? "currently-selected": "" }`}
                                        onClick={() => handleBtnClick(option)}
                                    >
                                        {option}
                                    </Button>
                                </Box>
                            )
                        })
                     : 
                        keyRegisteredUserOptions.map((option, i) => {
                            return (
                                <Box key={i} className={`stack-option-container ${ i !== keyRegisteredUserOptions.length-1 ? "thin-lower-border": ''}`}>
                                    <Button 
                                        sx={hoverBtnOverrides} 
                                        className={`stack-option-btn ${ currentlySelectedOption === option ? "currently-selected": "" }`}
                                        onClick={() => handleBtnClick(option)}
                                    >
                                        {option}
                                    </Button>
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