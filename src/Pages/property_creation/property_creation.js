import React, { useState } from 'react';
import './property_creation.css'; 
import { db, storage } from "../../config/firebase";
import { collection, addDoc } from 'firebase/firestore';
import {ref, uploadBytes } from 'firebase/storage';


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
    setProperty({ ...property, images: selectedImages, imageNames: selectedImages.map(image => {
      const timestamp = new Date().getTime();
      const formattedTimestamp = new Date(timestamp).toISOString().replace(/[-T:.Z]/g, '_');
      const filename = `${formattedTimestamp}_${image.name.replace(/ /g, '_')}`;
      return filename;
    })});
    
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add code to submit the property data to your backend or state management system
  //   console.log('Submitted:', property);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add code to submit the property data to Firebase Firestore
    try {
      // Add the property data to Firestore
      const docRef = await addDoc(collection(db, 'properties'), {
        name: property.name,
        unitCount: parseInt(property.unitCount, 10),
        parkingCount: parseInt(property.parkingCount, 10),
        lockerCount: parseInt(property.lockerCount, 10),
        address: property.address,
        files: property.imageNames
      });
  
      // Upload images to Firebase Storage
      if (property.images.length > 0) {
        for (let i = 0; i < property.images.length; i++) {
          const property_files_ref = ref(storage, `property_files/${property.imageNames[i]}`)
          uploadBytes(property_files_ref, property.images[i]);
      }
      }
      console.log('Property created with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding property: ', error);
    }
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
