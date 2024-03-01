import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for redirection
import './Dashboard.css';
import logo from '../../../Images/Logos/Nexus-clear-noText.png';



//Import or fetch images for the condos
import unit1 from "../../../Images/CondoImages/Units/Unit5/img1.jpg";
import unit2 from "../../../Images/CondoImages/Units/Unit6/img1.jpg";
import unit3 from "../../../Images/CondoImages/Units/Unit7/img1.jpg";
import unit4 from "../../../Images/CondoImages/Units/Unit4/img1.jpg";



const properties = [
  //Once the properties that the user possesses are fetched, information can be parsed into this array. Regardless of the number of the property, all can be put here. 
  //For any overflow properties, do not put the image field in the dataset
  {
    id: 1,
    image: unit1,
    buildingName: 'Maple Heights Condos',
    address: '456 Maple Avenue',
    unitCount: 50,
    parkingCount: 60,
    lockerCount: 25
  },
  {
    id: 2,
    image: unit2,
    buildingName: 'CyberSky Towers',
    address: 'AI Avenue, Sector 404',
    unitCount: 200,
    parkingCount: 250,
    lockerCount: 100
  },
  {
    id: 3,
    image: unit3,
    buildingName: 'Birchwood Manor',
    address: '234 Birch Street',
    unitCount: 40,
    parkingCount: 50,
    lockerCount: 15
  },
  {
    id: 4,
    image: unit4,
    buildingName: 'Neon Nexus Residences',
    address: '1010 Quantum Loop',
    unitCount: 150,
    parkingCount: 200,
    lockerCount: 75
  },
  {
    id: 5,
    buildingName: 'Cedar Grove Apartments',
    address: '101 Cedar Road',
    unitCount: 80,
    parkingCount: 90,
    lockerCount: 35
  }
  // Add more properties as needed
];

const CompanyHome = () => {
  //Caps the number of properties to be shown on the owner dashboard to 4. Takes the properties array defined above and selects the first 4 elements (in theory the 4 most recent properties).
  const limitedProperties = properties.slice(0, 4);

  return (
    <div className='rest'>
      {/* Navbar component space */}
      <div className="navbar">
        {/* Your navbar component goes here */}
        
      </div>
      
      {/* Main content */}
      <div className="home-page">
        <div className='panel-container'>
        {/* Left panel */}
        <div className="left-panel">
        <img src={logo} alt="Company Logo" className='logo'/>
        <h3 className='nexus' style={{fontFamily: 'telemarines', fontSize: '24px'}}>Nexus</h3>
          <ul>
            <li><Link to="/profile">Company Profle</Link></li>
            <li><Link to="/manage-properties">Upload a file</Link></li>
            <li><Link to="/financial-status">Create property profile</Link></li>
            <li><Link to="/requests">View properties</Link></li>
            <li><Link to="/requests">Send key</Link></li>
            <li><Link to="/requests">View employees</Link></li>
            {/*Add functionalities here*/}
          </ul>
        </div>
        {/* Right panel */}
        <div className="right-panel">
          {limitedProperties.map(property => (
            <div key={property.id} className="property-card" onClick={() => console.log(`Redirect to unit ${property.unit}`)}>
              <div className='property-content'>
              <div className='image-container'>
                <img src={property.image} alt="Property" className='property-image'/>
              </div>
              <div className="property-details">
                <div>
                  <h3>{property.buildingName}</h3>
                  <p>{property.address}</p>
                </div>
                <div>
                  <p>Unit Count: {property.unitCount}</p>
                  <p>Parking Count: {property.parkingCount}</p>
                  <p>Locker Count: {property.lockerCount}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="view-more">
            <Link className="view-more-button" to="/manage-properties">
              
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
