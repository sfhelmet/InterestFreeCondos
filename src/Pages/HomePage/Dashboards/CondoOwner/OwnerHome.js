import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../../../../config/firebase';
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage';
import AuthenticatedUserContext from '../../../../contexts/AuthenticatedUserContext';
import logo from '../../../../Images/Logos/Nexus-clear-noText.png';

import './OwnerHome.css'; 

const OwnerHome = () => {
  const currentUser = useContext(AuthenticatedUserContext);
  const [condoProperties, setCondoProperties] = useState([]);

  const fetchOwnedProperties = useCallback(async () => {
    const fetchedUnits = await getDocs(collection(db, "condoUnits"));
    const parsedUnits = await Promise.all(fetchedUnits.docs.map(async (condoUnit) => {
      const unit = condoUnit.data();
      const unitImage = await fetchPropertyImage(unit.imageFileName);
      return { ...unit, propertyImageURL: unitImage };
    }));

    setCondoProperties(parsedUnits);
  },[]);

  const fetchPropertyImage = async (fileName) => {
    const propertyPictureRef = ref(storage, `sampleCondoUnits/${fileName}`);

    const imageURL = await getDownloadURL(propertyPictureRef)
      .then((url) => {
        return url;
      })
      .catch(err => {
        console.error(err.message)
        return null;
      });
    
    return imageURL;
  }

  useEffect(() => {
    if (currentUser){
      fetchOwnedProperties();
    }
  },[currentUser, fetchOwnedProperties]);

  return (
    <div>
      <div className="home-page">
        <div className='panel-container'>
          <div className="left-panel">
            <img src={logo} alt="Company Logo" className='logo'/>
            <h3 className='nexus' style={{fontFamily: 'telemarines', fontSize: '24px'}}>Nexus</h3>
            <ul>
              <li><Link to="/profile">My Profle</Link></li>
              <li><Link to="/manage-properties">Manage Properties</Link></li>
              <li><Link to="/financial-status">Financial Status</Link></li>
              <li><Link to="/requests">View Requests</Link></li>
            </ul>
          </div>
          <div className="right-panel">
            {condoProperties.map(property => (
              <div key={property.id} className="property-card" onClick={() => console.log(`Redirect to unit ${property.unit}`)}>
                <div className='property-content'>
                  <img src={property.propertyImageURL} alt="Property" className='property-image'/>
                  <div className="property-details">
                    <div>
                      <h3>{property.buildingName}</h3>
                      <p>{property.address}</p>
                      <p>{property.unit}</p>
                    </div>
                    <div>
                      <h4>Rented by: {property.renterName}</h4>
                      <p>Monthly Rent: {property.monthlyRent}</p>
                      <p>Balance Due: {property.balanceDue}</p>
                      <p>Due Date: {property.dueDate}</p>
                      <p>Received Money: {property.receivedMoney}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="view-more">
              <Link className="view-more-button" to="/manage-properties"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
