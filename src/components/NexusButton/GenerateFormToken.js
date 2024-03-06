import React, { useState } from "react";
const KJUR = require('jsrsasign');

const GenerateTokenForm = ({ children }) => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [unit, setUnit] = useState("");
  const [generatedToken, setGeneratedToken] = useState(""); // State to store generated token
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };
  const generateToken = () => {
    // Construct payload using form data
    const payload = {
      email: email,
      userType: userType,
      unit: unit,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // expiresIn, token will expire in 1 hour
    };

    // Secret key used to sign the token
    const secretKey = process.env.REACT_APP_Secret_Key;

    // Convert the secret key to a hexadecimal string
    const keyHex = KJUR.crypto.Util.sha256(secretKey);

    // Create the JWT header
    const header = { alg: 'HS256', typ: 'JWT' };

    const token = KJUR.jws.JWS.sign(null, header, JSON.stringify(payload), keyHex);

    // Update state with generated token
    setGeneratedToken(token);
  };

  return (
    <div>
      <h1>JWT Token Generator</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>
            <input
              id="renter"
              type="radio"
              value="Renter"
              checked={userType === "Renter"}
              onChange={handleUserTypeChange}/>
            Renter
          </label>
          <label>
            <input
              id="owner"
              type="radio"
              value="Owner"
              checked={userType === "Owner"}
              onChange={handleUserTypeChange}/>
            Owner
          </label>
        </div>
        <div>
          <label htmlFor="unit">Unit:</label>
          <input
            type="text"
            id="unit"
            value={unit}
            onChange={handleUnitChange}
          />
        </div>
        <button type="button" id="token" onClick={generateToken}>
          Generate JWT Token
        </button>
      </form>
      {/* Display the generated token */}
      {generatedToken && (
        <div>
          <h2>Generated JWT Token:</h2>
          <textarea
            id="TokenTextArea"
            rows="5"
            cols="50"
            value={generatedToken}
            readOnly
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default GenerateTokenForm;
