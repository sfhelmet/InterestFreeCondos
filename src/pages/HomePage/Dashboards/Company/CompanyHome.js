import React, { useCallback, useEffect, useState } from "react";
import { db, storage } from "../../../../config/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthenticatedUserContext } from "../../../../contexts/AuthenticatedUserContext";

import "./CompanyHome.css";

const CompanyHome = () => {
  const { authenticatedUser: currentUser } = useAuthenticatedUserContext();
  const [condoProperties, setCondoProperties] = useState([]);

  const fetchOwnedProperties = useCallback(async () => {
    const fetchedUnits = await getDocs(collection(db, "condoUnits"));

    const parsedUnits = await Promise.all(
      fetchedUnits.docs.map(async (condoUnit) => {
        const unit = condoUnit.data();
        if (currentUser.userID === unit.companyId) {
          const unitImage = await fetchPropertyImage(unit.imageFileName);
          return { ...unit, propertyImageURL: unitImage, isEditing: false }; // Adding isEditing property
        }
        return null;
      })
    );

    const filteredUnits = parsedUnits.filter((unit) => unit !== null);

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
    if (currentUser) {
      fetchOwnedProperties();
    }
  }, [currentUser, fetchOwnedProperties]);

  const handleToggleEdit = (propertyId) => {
    setCondoProperties((prevProperties) => {
      return prevProperties.map((property) => {
        if (property.id === propertyId) {
          return { ...property, isEditing: !property.isEditing };
        }
        return property;
      });
    });
  };

  const handlePropertyChange = (propertyId, field, value) => {
    const updatedProperties = condoProperties.map((property) => {
      if (property.id === propertyId) {
        return { ...property, [field]: value };
      }
      return property;
    });
    setCondoProperties(updatedProperties);
  };

  const updatePropertyInFirebase = async (propertyId, updatedProperty) => {
    try {
      const propertyDocRef = doc(db, "condoUnits", `${propertyId}`);
      await updateDoc(propertyDocRef, updatedProperty);
      console.log("Property updated successfully");
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleSaveProperty = async (propertyId) => {
    const propertyToUpdate = condoProperties.find(
      (property) => property.id === propertyId
    );
    if (propertyToUpdate) {
      await updatePropertyInFirebase(propertyId, propertyToUpdate);
    }
  };

  return (
    <div className="home-page">
      <div className="panel-container">
        <div className="right-panel">
          {condoProperties.length > 0 ? (
            condoProperties.map((property) => (
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
                      <p>Unit {property.unit}</p>
                    </div>
                    <div>
                      <h4>Rented by: {property.renterName}</h4>
                      {property.isEditing ? (
                        <div>
                          <input
                            type="text"
                            placeholder="Monthly Rent"
                            value={property.monthlyRent}
                            onChange={(e) =>
                              handlePropertyChange(
                                property.id,
                                "monthlyRent",
                                e.target.value
                              )
                            }
                          />
                          <button
                            id="save-property-btn"
                            onClick={() => handleSaveProperty(property.id)}
                          >
                            Save
                          </button>
                          <button
                            id="cancel-edit-btn"
                            onClick={() => handleToggleEdit(property.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="property-buttons">
                          <p className="monthly-rent">Monthly Rent: {property.monthlyRent}</p>
                          <button
                            id="edit-property-btn"
                            onClick={() => handleToggleEdit(property.id)}
                            className="edit-button"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-properties">There are no properties to view.</div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default CompanyHome;
