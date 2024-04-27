import React, { useState } from "react";
import './GenerateFormToken.css'
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
    const payload = {
      email: email,
      userType: userType,
      unit: unit,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // expiresIn, token will expire in 1 hour
    };

    const secretKey = process.env.REACT_APP_Secret_Key;
    const keyHex = KJUR.crypto.Util.sha256(secretKey);
    const header = { alg: 'HS256', typ: 'JWT' };
    const token = KJUR.jws.JWS.sign(null, header, JSON.stringify(payload), keyHex);
    setGeneratedToken(token);
  };

  return (
    <div className="token-page-container">
      <div className="token-page">
        <h1>JWT Token Generator</h1>
        <form>
          <div className="unit-text-container">

            <div className="token-label">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter user email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="token-label" style={{marginTop: "20px"}}>
              <label htmlFor="unit">Unit</label>
              <input
                type="text"
                id="unit"
                placeholder="Enter condo unit"
                value={unit}
                onChange={handleUnitChange}
              />
            </div>
          </div>
          <div style={{marginTop: "20px"}}>
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
          <button type="button" id="token" onClick={generateToken}>
            Generate JWT Token
          </button>
        </form>
        {/* Display the generated token */}
        <div className="generated-token-area">
            <h2 id='generated-token'>Generated JWT Token</h2>
            <textarea
              id="TokenTextArea"
              rows="5"
              cols="50"
              placeholder="Token will be pasted in this area"
              value={generatedToken || ""}
              readOnly
            />
          </div>
        {children}
      </div>
    </div>
  );
};

export default GenerateTokenForm;
