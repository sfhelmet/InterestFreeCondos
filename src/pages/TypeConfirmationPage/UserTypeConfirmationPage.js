import React, { useState } from 'react';
import NexusClearLogo from "../../images/Logos/Nexus-clear-noText.png";
import { useAuthenticatedUserContext } from '../../contexts/AuthenticatedUserContext';

import { auth, db } from "../../config/firebase";
import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";


const UserTypeRegistrationPage = () => {
    const [userType, setUserType] = useState("");
    const { authenticatedUser: currentUser } = useAuthenticatedUserContext();

    const getCurrentUser = () => {
        let uid = auth.currentUser.uid;
        
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where('userID', '==', uid));

        return getDocs(userQuery);
    }

    const handleSubmit = async() => {
        const userSnapshot = await getCurrentUser();
        const userType = userSnapshot.docs[0].data().userType;
        const newUser = {
            userID: userSnapshot.doc[0].data().uid,
            email: userSnapshot.doc[0].data().email,
            userName: userSnapshot.doc[0].data().userName,
            phone: null,
            profilePic: null,
            userType: userType
        }
        setDoc(doc(db,"users", newUser.userID), newUser);
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
