import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Center from "../../Utils/Center";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import { setDoc, doc } from "firebase/firestore";

import "./Register.css";

const Register = () => {
    const [userName, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                const newUser = {
                    userID: userCredential.user.uid,
                    email: userEmail,
                    userName: userName,
                    phone: userPhone,
                    profilePic: null,
                    userType: 'PUBLIC'
                }
                
                setDoc(doc(db,"users", newUser.userID), newUser);
            })
            .then(() => {
                navigate("/public-home")
            })
            .catch((err) => {
                console.error("Error occurred during account creation")
                console.error(err.message)
            })
    }

    return (
        <Center height={"auto"}>
            <Box className={"register-container"}>
                <Box className={"register-inputs"} display={"flex"} flexDirection={"column"}>
                    <TextField 
                        className="user-name" 
                        size="small" 
                        label={"Enter username:"}
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField 
                        className="user-email" 
                        size="small" 
                        label={"Enter email:"}
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <TextField 
                        className="user-password" 
                        size="small" 
                        type="password" 
                        label={"Enter new password:"}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <TextField 
                        className="user-phone" 
                        size="small" 
                        label={"Enter phone:"}
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                    />
                </Box>
                <Button className="register-btn" variant="contained" onClick={handleRegister}>Register</Button>
            </Box>
        </Center>
    )
}

export default Register;