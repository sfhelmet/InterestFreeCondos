import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Logout from '../Auth/Logout/Logout';
import { useAuthenticatedUserContext } from '../../contexts/AuthenticatedUserContext'
import './Navbar.css'
import * as Navigations from '../../navlinks'

const NexusNavbar = (props) => {
    const [links, setLinks] = useState([]);
    const { authenticatedUser: currentUser } = useAuthenticatedUserContext();

    const navigation = (userType) => {
        switch (userType) {
            case "RENTAL": 
                return Navigations.rental;
            case "OWNER":
                return Navigations.owner;
            case "MANAGEMENT": 
                return Navigations.management;
            case "EMPLOYEE":
                return Navigations.employee;
            default:
              return [];
        }
    }

    useEffect(() => {
        if (currentUser) {
            console.log("set navigation")
            setLinks(navigation(currentUser.userType));
        }
    },[currentUser]);



    return (
        <div className='nexus-navigation-bar'>
            <div className='nexus-nav-logo'>
                <Link to="/" className='nexus-nav-link'>
                    <h3 className="nexus-nav-name">Nexus</h3>
                </Link>
            </div>
            <div className='nexus-nav-button-section'>
                { links ? links.map( page => 
                    (
                        <Link to={page.route} className='nexus-nav-link' key={page.label}>
                            <div>
                                {page.label}
                            </div>
                        </Link>
                    )
                ) : (<></>)
                }
            </div>
            <Logout/>
        </div>
    );
}


export default NexusNavbar;