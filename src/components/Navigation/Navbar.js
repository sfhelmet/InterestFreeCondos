import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


import './Navbar.css'

const NexusNavbar = (props) => {

    return (
        <div className='nexus-navigation-bar'>
            <div className='nexus-nav-logo'>
                <Link to="/" className='nexus-nav-link'>
                    <h3 className="nexus-nav-name">Nexus</h3>
                </Link>
            </div>
            <div className='nexus-nav-button-section'>
                { props.links ? props.links.map( page => 
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
        </div>
    );
}


export default NexusNavbar;