import { useContext, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, Providers } from "../../../config/firebase";
import { Box, Button, TextField, Typography } from "@mui/material";
import AuthenticatedUserContext from "../../../contexts/AuthenticatedUserContext";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from '@mui/icons-material/Login';
import Center from "../../Utils/Center";
import { doc, getDoc, setDoc } from "firebase/firestore";

import "./AuthContainer.css";

const AuthContainer = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");
  const { updateAuthenticatedUser } = useContext(AuthenticatedUserContext)


  let userObjectCreated = false;

  const nonSSOSignIn = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await getDoc(doc(db, "users", user.uid))
        .then( doc => {
          switch(doc.data().userType){
            case "RENTAL":
                navigate("/")
                break;
            case "OWNER":
                navigate("/owner-home")
                break;
            case "MANAGEMENT":
                navigate("/company-home");
                break;
            default:
                navigate("/");
          }
        }
        )
      })
      .catch(err => {
        console.error("Error signing in");
        console.error(err.message);
      })
  }

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .then(async userCreds => {
        const { user } = userCreds;
        const customUserObj = {
          userID: user.uid,
          email: user.email,
          phone: user.phoneNumber,
          userName: user.displayName,
          userType: "PUBLIC",
          profilePic: null
        }

        let userExists = true;
        await getDoc(doc(db, "users", customUserObj.userID))
          .then(doc => {
            if (!doc.data()) {
              userExists = false;
            } else {
              setUserType(doc.data().userType);
            }
          }).catch(err => {
            console.log(err.message);
          });

        if (!userExists) {
          await setDoc(doc(db, "users", customUserObj.userID), customUserObj)
            .then(() => {
              console.log("Custom User Obj created from Google SSO obj");
              userObjectCreated = true;
            })
            .catch(err => {
              console.log(err.message);
            });
        }
        updateAuthenticatedUser(customUserObj);
      }).then(() => {
        setDisabled(false);
        if(userObjectCreated){
          navigate("/user-selection");
        } else {
          switch(userType){
            case "RENTAL":
                navigate("/")
                break;
            case "OWNER":
                navigate("/owner-home")
                break;
            case "MANAGEMENT":
                navigate("/company-home");
                break;
            default:
                navigate("/")
        }
        }
      }).catch((error) => {
        console.error("Error signing in with Google");
        setErrorMessage(error.code + ": " + error.message);
        setDisabled(false);
      });
  };

  return (
    <Center height={"auto"}>
      <Box className="auth-container">
        <Box className={"simple-login-container"}>
          <Box className={"login-inputs"} display={"flex"} flexDirection={"column"}>
            <TextField 
              className={"login-email"}
              label="Email:"
              size="small"
              disabled={disabled}
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
            <TextField 
              className={"login-password"}
              type="password"
              label="Password:"
              size="small"
              disabled={disabled}
              value={userPassword}
              onChange={e => setUserPassword(e.target.value)}
            />
          </Box>
          <Button 
            className={"login-btn"} 
            startIcon={<LoginIcon/>} 
            size="medium" 
            variant="contained"
            disabled={disabled}
            onClick={nonSSOSignIn}
          >
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
