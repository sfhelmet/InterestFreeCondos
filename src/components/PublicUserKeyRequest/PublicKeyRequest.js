import React, { useState } from 'react';
import './PublicKeyRequest.css';
import '../../Styling/Fonts/fonts.css';

const PublicKeyRequest = () => {
  const [keyNumber, setKeyNumber] = useState('');

  const handleSubmit = () => {
    // Logic for submitting key number
    console.log('Submitting key number:', keyNumber);
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
