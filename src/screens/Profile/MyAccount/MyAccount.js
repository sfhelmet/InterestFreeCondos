import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import AuthenticatedUserContext from "../../../contexts/AuthenticatedUserContext";

import "./MyAccount.css";

const MyAccount = () => {
    const currentUser = useContext(AuthenticatedUserContext);

    const fontFamilyOverride = { fontFamily: "inherit" };
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
                <Box className="btns-container">
                    <Button
                        sx={fontFamilyOverride}
                        variant="outlined"
                        className="discard-btn"
                    >
                        Discard
                    </Button>
                    <Button
                        sx={fontFamilyOverride}
                        variant="contained"
                        className="save-btn"
                    >
                        Save Changes
                    </Button>
                </Box>
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
                            value={currentUser && currentUser.userName ? currentUser.userName : "N/A"}
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
                            value={currentUser && currentUser.phone ? currentUser.phone : "N/A"}
                        />
                    </Box>
                </Box>
            </Box>
            <Box className="btns-container force-flex-right">
                <Button
                    sx={fontFamilyOverride}
                    variant="outlined"
                    className="discard-btn"
                >
                    Discard
                </Button>
                <Button
                    sx={fontFamilyOverride}
                    variant="contained"
                    className="save-btn"
                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
}

export default MyAccount;