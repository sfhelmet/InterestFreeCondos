import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout/Logout';
import { useAuthenticatedUserContext } from '../../contexts/AuthenticatedUserContext';
import './Navbar.css';
import * as Navigations from '../../navlinks';

const NexusNavbar = (props) => {
    const [links, setLinks] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Initial check for mobile screen
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
            setLinks(navigation(currentUser.userType));
        }
    }, [currentUser]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? (
                <MobileNavbar links={links} />
            ) : (
                <DesktopNavbar links={links} />
            )}
        </>
    );
}

const DesktopNavbar = ({ links }) => (
    <div className='nexus-navigation-bar'>
        <div className='nexus-nav-logo'>
            <Link to="/" className='nexus-nav-link'>
                <h3 className="nexus-nav-name">Nexus</h3>
            </Link>
        </div>
        <div className='nexus-nav-button-section'>
            {links ? links.map(page =>
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
        <Logout />
    </div>
);

const MobileNavbar = ({ links }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`nexus-navigation-bar-mobile ${menuOpen ? 'open' : ''}`}>
            <div className='nexus-nav-logo'>
                <Link to="/" className='nexus-nav-link'>
                    <h3 className="nexus-nav-name">Nexus</h3>
                </Link>
            </div>
            <div className={`nexus-nav-button-section-mobile ${menuOpen ? 'open' : ''}`}>
                <div className='menu-toggle' onClick={toggleMenu}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </div>
                {links ? (
                    <div className='menu-links'>
                        {links.map(page => (
                            <Link to={page.route} className='nexus-nav-link' key={page.label}>
                                <div>{page.label}</div>
                            </Link>
                        ))}
                    </div>
                ) : null}
            </div>
            <Logout />
        </div>
    );
};

export default NexusNavbar;
