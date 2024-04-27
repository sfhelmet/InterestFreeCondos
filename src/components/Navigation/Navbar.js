import { Link } from 'react-router-dom';
import * as navconfig from './navcomponents'

import './Navbar.css'

const NexusNavbar = () => {

    // Types of users
    //  - Rental
    //  - Management
    //  - Owner
    //  - Employee

    const nav_config = navconfig.employee;


    return (
        <div className='nexus-navigation-bar'>
            <div className='nexus-nav-logo'>
                <Link to="/" className='nexus-nav-link'>
                    <h3 className="nexus-nav-name">Nexus</h3>
                </Link>
            </div>
            <div className='nexus-nav-button-section'>
                { nav_config.map( page => 
                    (
                        <Link to={page.route} className='nexus-nav-link' key={page.label}>
                            <div>
                                {page.label}
                            </div>
                        </Link>
                    )
                )
                }
            </div>
        </div>
    );
}


export default NexusNavbar;