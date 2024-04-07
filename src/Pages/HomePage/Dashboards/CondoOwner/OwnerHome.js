import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../../../config/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import AuthenticatedUserContext from "../../../../contexts/AuthenticatedUserContext";
import logo from "../../../../Images/Logos/Nexus-clear-noText.png";

import "./OwnerHome.css";

const OwnerHome = () => {
  const currentUser = useContext(AuthenticatedUserContext);
  const [condoProperties, setCondoProperties] = useState([]);

  const fetchOwnedProperties = useCallback(async () => {
    const fetchedUnits = await getDocs(collection(db, "condoUnits"));
    const parsedUnits = await Promise.all(
      fetchedUnits.docs.map(async (condoUnit) => {
        const unit = condoUnit.data();
        const unitImage = await fetchPropertyImage(unit.imageFileName);
        return { ...unit, propertyImageURL: unitImage, isEditing: false }; // Adding isEditing property
      })
    );

    setCondoProperties(parsedUnits);
  }, []);

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
    <div>
      <div className="home-page">
        <div className="panel-container">
          <div className="left-panel">
            <img src={logo} alt="Company Logo" className="logo" />
            <h3
              className="nexus"
              style={{ fontFamily: "telemarines", fontSize: "24px" }}
            >
              Nexus
            </h3>
            <ul>
              <li>
                <Link to="/profile">My Profle</Link>
              </li>
              <li>
                <Link to="/manage-properties">Manage Properties</Link>
              </li>
              <li>
                <Link to="/financial-status">Financial Status</Link>
              </li>
              <li>
                <Link to="/requests">View Requests</Link>
              </li>
            </ul>
          </div>
          <div className="right-panel">
            {condoProperties.map((property) => (
              <div key={property.id} className="property-card">
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
                          <input
                            type="text"
                            placeholder="Balance Due"
                            value={property.balanceDue}
                            onChange={(e) =>
                              handlePropertyChange(
                                property.id,
                                "balanceDue",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="date"
                            placeholder="Due Date"
                            value={property.dueDate}
                            onChange={(e) =>
                              handlePropertyChange(
                                property.id,
                                "dueDate",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="text"
                            placeholder="Received Money"
                            value={property.receivedMoney}
                            onChange={(e) =>
                              handlePropertyChange(
                                property.id,
                                "receivedMoney",
                                e.target.value
                              )
                            }
                          />
                          <button
                            onClick={() => handleSaveProperty(property.id)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <>
                          <p>Monthly Rent: {property.monthlyRent}</p>
                          <p>Balance Due: {property.balanceDue}</p>
                          <p>Due Date: {property.dueDate}</p>
                          <p>Received Money: {property.receivedMoney}</p>
                        </>
                      )}
                      <button onClick={() => handleToggleEdit(property.id)}>
                        {property.isEditing ? "Cancel" : "Edit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="view-more">
              <Link className="view-more-button" to="/manage-properties" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
