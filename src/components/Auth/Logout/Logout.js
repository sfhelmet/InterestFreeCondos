import React, { useState } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";

import "./Logout.css";

const Logout = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  return (
    <div className="logout-btn-container">
      <Button className="logout-btn" disabled={disabled} onClick={logout} variant="contained">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
