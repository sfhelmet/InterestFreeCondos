import React, { useState } from 'react';
import NexusClearLogo from "../../images/Logos/Nexus-clear-noText.png";
import { useAuthenticatedUserContext } from '../../contexts/AuthenticatedUserContext';
import { db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const UserTypeRegistrationPage = () => {
    const [userType, setUserType] = useState("");
    const { authenticatedUser: currentUser, updateAuthenticatedUser } = useAuthenticatedUserContext();
    const navigate = useNavigate();

    const handleSubmit = async() => {
      const updatedUser = {
        ...currentUser,
        userType:userType
      };

      await setDoc(doc(db,"users", currentUser.userID), updatedUser)
      .then(() => {
        updateAuthenticatedUser(updatedUser);
        switch(userType){
          case "RENTAL":
              navigate("/renter-home");
              break;
          case "OWNER":
              navigate("/owner-home");
              break;
          case "MANAGEMENT":
              navigate("/company-home");
              break;
          default:
              navigate("")
        }
      });
    }

  return (
    <div className="home-page-container">
      <div className="company-info">
        {/* Placeholder for company logo */}
        <img src={NexusClearLogo} alt="Company Logo" />
        <h3 style={{fontFamily: 'telemarines', fontSize: '36px'}}>Nexus</h3>
        {/* Placeholder for company description */}
        <p style={{fontFamily: 'telemarines', fontSize: '24px'}}>Tomorrow's Condo Management, Today</p>
      </div>

      <div className="typeInput">
        <h2>Please select which type of user fits you</h2>
        <select value={userType} onChange={(e => setUserType(e.target.value))}>
            <option value="">Select user type</option>
            <option value="RENTAL">Renter</option>
            <option value="OWNER">Owner</option>
            <option value="MANAGEMENT">Company</option>
            <option value="PUBLIC">I don't know yet</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default UserTypeRegistrationPage;
