import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Box, Button, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from '@mui/icons-material/Login';
import Center from "../utils/Center";

import "./AuthContainer.css";

const AuthContainer = (props) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .then(() => {
        setDisabled(false);
        console.info("TODO: navigate to authenticated screen");
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        setDisabled(false);
      });
  };

  return (
    <Center height={"auto"}>
      <Box className="auth-container">
        <Box className={"simple-login-container"}>
          <Box className={"login-inputs"} display={"flex"} flexDirection={"column"}>
            <TextField className={"login-email"} label="Email:" size="small"/>
            <TextField className={"login-password"} type="password" label="Password:" size="small"/>
          </Box>
          <Button className={"login-btn"} startIcon={<LoginIcon/>} size="medium" variant="contained">
            Sign In
          </Button>
        </Box>
        <hr/>
        <Box className={"sso-logins-container"}>
          <Button
            startIcon={<GoogleIcon />}
            size="medium"
            disabled={disabled}
            variant="contained"
            onClick={signInWithGoogle}
            className="goolge-sso-login-btn"
          >
            Sign In With Google
          </Button>
        </Box>
        <Typography sx={{ mt: 2 }} color={"red"}>
          {errorMessage}
        </Typography>
      </Box>
    </Center>
  );
};

export default AuthContainer;
