import React, { useState } from 'react';
import { keyExists, uploadKey, getUserIdbyEmail, updateCondo } from './UserKeyRegistrationService';
import NexusClearLogo from "../../images/Logos/Nexus-clear-noText.png";
import './UserKeyRegistration.css';
import '../../styling/Fonts/fonts.css';
const KJUR = require('jsrsasign');


const UserKeyRegistration = () => {
  const [keyNumber, setKeyNumber] = useState('');

  const secretKey = process.env.REACT_APP_Secret_Key;
  const keyHex = KJUR.crypto.Util.sha256(secretKey);

  const handleSubmit = async () => {
    if (keyNumber === '') {
      alert('Please enter a key.');
      return;
    }
    try {
      const decoded = KJUR.jws.JWS.parse(keyNumber);
      const isValid = KJUR.jws.JWS.verifyJWT(keyNumber, keyHex, { alg: ['HS256'] });
      if (isValid) {
          const claims = decoded.payloadObj;
          if (await keyExists(keyNumber)) {
            alert('Key already used.');
            return;
          }
          alert('JWT is valid.');
          console.log(claims);
          await uploadKey(keyNumber, claims.exp);
          const userId = await getUserIdbyEmail(claims.email);
          updateCondo(userId, claims.unit, claims.userType);
      } else {
          alert('JWT is invalid.');
      }
    } catch (error) {
        alert('Error validating JWT:', error);
    }
  };

  return (
    <div className="home-page-container">
      <div className="company-info">
        {/* Placeholder for company logo */}
        <img src={NexusClearLogo} alt="Company Logo" />
        <h3 style={{fontFamily: 'telemarines', fontSize: '36px'}}>Nexus</h3>
        {/* Placeholder for company description */}
        <p style={{fontFamily: 'telemarines', fontSize: '24px'}}>Tomorrow's Condo Management, Today</p>
      </div>

      <div className="authentication">
        <h2>Please enter registration key number</h2>
        <p>The key is used to identify which property you are trying to access. It should have been sent to you by email.</p>
        <p>Please verify your spam folder if you have not received it.</p>
        <input
          type="text"
          value={keyNumber}
          onChange={(e) => setKeyNumber(e.target.value)}
          placeholder="Enter key number"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default UserKeyRegistration;
