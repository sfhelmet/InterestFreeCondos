import { Box, Button, TextField } from "@mui/material";
import Center from "../../utils/Center";

import "./Register.css";

const Register = () => {
    return (
        <Center height={"auto"}>
            <Box className={"register-container"}>
                <Box className={"register-inputs"} display={"flex"} flexDirection={"column"}>
                    <TextField className="user-name" size="small" label={"Enter username:"}/>
                    <TextField className="user-email" size="small" label={"Enter email:"}/>
                    <TextField className="user-password" size="small" type="password" label={"Enter new password:"}/>
                    <TextField className="user-phone" size="small" label={"Enter phone:"}/>
                </Box>
                <Button className="register-btn" variant="contained">Register</Button>
            </Box>
        </Center>
    )
}

export default Register;