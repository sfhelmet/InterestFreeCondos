import React, { useState } from "react";
const sign = require("jwt-encode");

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
    };

    // Secret key used to sign the token
    const secretKey = process.env.REACT_APP_Secret_Key;

    // Generate JWT token
    const token = sign(payload, secretKey);

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
          <label htmlFor="userType">User Type:</label>
          <input
            type="text"
            id="userType"
            value={userType}
            onChange={handleUserTypeChange}
          />
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
