import { Link } from 'react-router-dom';

import './Navbar.css'

const NexusNavbar = () => {


    const rental_config = [
        {
            label: "Home",
            route: "/"
        },
        {
            label: "Requests",
            route: "/request-submission"
        }
    ]

    const nav_config = rental_config;


    return (
        <div className='nexus-navigation-bar'>
            <div className='nav-logo'>
                <Link to="/" className='nav-link'>
                    <h3 className="nexus-nav-name">Nexus</h3>
                </Link>
            </div>
            <div className='nav-button-section'>
                { nav_config ? (nav_config.map( page => (
                        <Link to={page.route} className='nav-link' key={page.label}>
                            <div>
                                {page.label}
                            </div>
                        </Link>
                    ))) : (<></>)
                }
            </div>
        </div>
    );
}


export default NexusNavbar;