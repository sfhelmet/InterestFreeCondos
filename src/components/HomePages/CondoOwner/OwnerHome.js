import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for redirection
import './OwnerHome.css'; // Import CSS file for styling




//Import or fetch images for the condos
import unit1 from "../../../imgs/CondoImages/Units/Unit1/img1.jpg";
import unit2 from "../../../imgs/CondoImages/Units/Unit2/img1.jpg";
import unit3 from "../../../imgs/CondoImages/Units/Unit3/img1.jpg";
import unit4 from "../../../imgs/CondoImages/Units/Unit4/img1.jpg";



const properties = [
  //Once the properties that the user possesses are fetched, information can be parsed into this array. Regardless of the number of the property, all can be put here. 
  //For any overflow properties, do not put the image field in the dataset
  {
    id: 1,
    image: unit1,
    buildingName: 'Example Tower',
    address: '123 Main St',
    unit: 'Unit 101',
    renterName: 'John Doe',
    monthlyRent: '$1500',
    balanceDue: '$200',
    dueDate: '2024-03-01',
    receivedMoney: '$3000'
  },
  {
    id: 2,
    image: unit2,
    buildingName: 'Sample Apartment',
    address: '456 Elm St',
    unit: 'Unit 202',
    renterName: 'Jane Smith',
    monthlyRent: '$1800',
    balanceDue: '$250',
    dueDate: '2024-03-05',
    receivedMoney: '$3500'
  },
  {
    id: 3,
    image: unit3,
    buildingName: 'Lakeview Apartments',
    address: '123 Maple Ln',
    unit: 'Unit 305',
    renterName: 'Emily Brown',
    monthlyRent: '$1500',
    balanceDue: '$200',
    dueDate: '2024-03-08',
    receivedMoney: '$1800'
  },
  {
    id: 4,
    image: unit4,
    buildingName: 'Sunset Villas',
    address: '789 Palm Dr',
    unit: 'Unit 405',
    renterName: 'David Wilson',
    monthlyRent: '$2200',
    balanceDue: '$400',
    dueDate: '2024-03-15',
    receivedMoney: '$2600'
  },
  {
    id: 5,
    buildingName: 'Pineview Estates',
    address: '789 Oak Ave',
    unit: 'Unit 101',
    renterName: 'Michael Johnson',
    monthlyRent: '$2000',
    balanceDue: '$300',
    dueDate: '2024-03-10',
    receivedMoney: '$3200'
  }
  // Add more properties as needed
];

const OwnerHome = () => {
  //Caps the number of properties to be shown on the owner dashboard to 4. Takes the properties array defined above and selects the first 4 elements (in theory the 4 most recent properties).
  const limitedProperties = properties.slice(0, 4);

  return (
    <div>
      {/* Navbar component space */}
      <div className="navbar">
        {/* Your navbar component goes here */}
        
      </div>
      
      {/* Main content */}
      <div className="home-page">
        <div className='panel-container'>
        {/* Left panel */}
        <div className="left-panel">
          <ul>
            <li><a href="#fun1">Functionality 1</a></li>
            <li><a href="#fun2">Functionality 2</a></li>
            <li><a href="#fun3">Functionality 3</a></li>
          </ul>
        </div>
        {/* Right panel */}
        <div className="right-panel">
          {limitedProperties.map(property => (
            <div key={property.id} className="property-card" onClick={() => console.log(`Redirect to unit ${property.unit}`)}>
              <div className='property-content'>
              <img src={property.image} alt="Property" className='property-image'/>
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
            <Link className="view-more-button" to="/all-properties">
              
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
