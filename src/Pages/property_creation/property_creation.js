import React, { useState } from 'react';
import './property_creation.css'; 

const PropertyForm = () => {
  const [property, setProperty] = useState({
    name: '',
    unitCount: 0,
    parkingCount: 0,
    lockerCount: 0,
    address: '',
    images: [] // New property to store the selected images
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleIncrement = (field) => {
    setProperty({ ...property, [field]: property[field] + 1 });
  };

  const handleDecrement = (field) => {
    if (property[field] > 0) {
      setProperty({ ...property, [field]: property[field] - 1 });
    }
  };
  
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setProperty({ ...property, images: selectedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to submit the property data to your backend or state management system
    console.log('Submitted:', property);
  };

  return (
    
    <div className="property-form-overlay">
      {/* Video Element */}
      <video autoPlay loop muted className="background-video">
        <source src="condo_3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form */}
      <div className="property-form-container">
        <h2 className="form-heading">Create Property Profile</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Property Name:
            <input type="text" name="name" value={property.name} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Unit Count:
            <div className="input-group">
              <input type="number" name="unitCount" value={property.unitCount} onChange={handleChange} className="form-input" min="0" />
              <div className="arrow" onClick={() => handleIncrement('unitCount')}>▲</div>
              <div className="arrow" onClick={() => handleDecrement('unitCount')}>▼</div>
            </div>
          </label>
          <label className="form-label">
            Parking Count:
            <div className="input-group">
              <input type="number" name="parkingCount" value={property.parkingCount} onChange={handleChange} className="form-input" min="0"/>
              <div className="arrow" onClick={() => handleIncrement('parkingCount')}>▲</div>
              <div className="arrow" onClick={() => handleDecrement('parkingCount')}>▼</div>
            </div>
          </label>
          <label className="form-label">
            Locker Count:
            <div className="input-group">
              <input type="number" name="lockerCount" value={property.lockerCount} onChange={handleChange} className="form-input" min="0"/>
              <div className="arrow" onClick={() => handleIncrement('lockerCount')}>▲</div>
              <div className="arrow" onClick={() => handleDecrement('lockerCount')}>▼</div>
            </div>
          </label>
          <label className="form-label">
            Address:
            <input name="address" value={property.address} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Images:
            <input type="file" name="images" onChange={handleImageChange} multiple className="form-input" />
          </label>
          <button type="submit" className="submit-button">Create Profile</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
