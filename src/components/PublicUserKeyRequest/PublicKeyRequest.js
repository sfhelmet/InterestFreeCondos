import React, { useState } from 'react';
import './PublicKeyRequest.css';
import '../../Styling/Fonts/fonts.css';
const KJUR = require('jsrsasign');


const PublicKeyRequest = () => {
  const [keyNumber, setKeyNumber] = useState('');

  const secretKey = process.env.REACT_APP_Secret_Key;

  // Convert the secret key to a hexadecimal string
  const keyHex = KJUR.crypto.Util.sha256(secretKey);

  const handleSubmit = () => {
    try {
      // Parse the JWT
      const decoded = KJUR.jws.JWS.parse(keyNumber);

      // Verify the signature
      const isValid = KJUR.jws.JWS.verifyJWT(keyNumber, keyHex, { alg: ['HS256'] });

      if (isValid) {
          // Signature is valid
          console.log('JWT is valid.');

          // Check additional claims if needed
          const claims = decoded.payloadObj;

          console.log('JWT is valid:', claims);
          // TODO: Update Firestore with payload
      } else {
          console.log('JWT is invalid.');
      }
    } catch (error) {
        console.log('Error validating JWT:', error);
    }
  };

  return (
    <div className="home-page">
      <div className="company-info">
        {/* Placeholder for company logo */}
        <img src="Nexus-clear-noText.png" alt="Company Logo" />
        <h3 style={{fontFamily: 'telemarines', fontSize: '36px'}}>Nexus</h3>
        {/* Placeholder for company description */}
        <p style={{fontFamily: 'telemarines', fontSize: '24px'}}>Tomorrow's Condo Management, Today</p>
      </div>

      <div className="authentication">
        <h2>Please enter registration key number</h2>
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

export default PublicKeyRequest;
