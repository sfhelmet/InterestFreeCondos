import React, { useCallback, useEffect, useState } from "react";
import { db, storage } from "../../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthenticatedUserContext } from "../../../../contexts/AuthenticatedUserContext";

const RentalHome = () => {
    const { authenticatedUser: currentUser } = useAuthenticatedUserContext();
    const [condoProperties, setCondoProperties] = useState([]);
  
    const fetchOwnedProperties = useCallback(async () => {
        const rentedUnitQuery = query(collection(db, 'condoUnits'), where('renterId', '==', currentUser.userID));
        const fetchedUnits = await getDocs(rentedUnitQuery);

      const parsedUnits = await Promise.all(
        fetchedUnits.docs.map(async (condoUnit) => {
            const unit = condoUnit.data();
            if (unit.renterId === currentUser.userID) {
                const unitImage = await fetchPropertyImage(unit.imageFileName);
                return { ...unit, propertyImageURL: unitImage };   
            }        
        })
      );
  
      const filteredUnits = parsedUnits.filter(unit => unit !== null);
      
      setCondoProperties(filteredUnits);
    }, [currentUser]);
  
    const fetchPropertyImage = async (fileName) => {
      const propertyPictureRef = ref(storage, `sampleCondoUnits/${fileName}`);
  
      const imageURL = await getDownloadURL(propertyPictureRef)
        .then((url) => {
          return url;
        })
        .catch((err) => {
          console.error(err.message);
          return null;
        });
  
      return imageURL;
    };
  
    useEffect(() => {
        if (currentUser && currentUser.userID !== "") {
            fetchOwnedProperties();
        }
    }, [currentUser, fetchOwnedProperties]);
  
  
    return (
      <div>
        <div className="rental-home-container">
          <div className="panel-container">
            <div className="right-panel">
                {
                    condoProperties.length > 0 ? condoProperties.map((property) => (
                        <div id={`property-${property.id}`} key={property.id} className="property-card">
                            <div className="property-content">
                                <img
                                src={property.propertyImageURL}
                                alt="Property"
                                className="property-image"
                                />
                                <div className="property-details">
                                    <div>
                                        <h3>{property.buildingName}</h3>
                                        <p>{property.address}</p>
                                        <p>{property.unit}</p>
                                    </div>
                                    <div>
                                        <h4>Rented by: {property.renterName}</h4>
                                        <p className="monthly-rent">Monthly Rent: {property.monthlyRent}</p>
                                        <p className="balance-due">Balance Due: {property.balanceDue}</p>
                                        <p className="due-date">Due Date: {property.dueDate}</p>
                                        <p className="received-money">Received Money: {property.receivedMoney}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) 
                    : 
                    <div>
                        There are no properties to view.
                    </div>
                }
            </div>
          </div>
        </div>
      </div>
    );
}

export default RentalHome;