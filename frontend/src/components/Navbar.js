import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import logo from '../assets/images/doddle4.png'; // Ensure this path is correct

const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const logoContainerRef = useRef(null);
    const menuRef = useRef(null);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    useEffect(() => {
        const handleMouseLeave = (e) => {
            if (!logoContainerRef.current || !menuRef.current) return;

            // Check if the mouse is still within the logo container or menu
            const isStillInLogoContainer = logoContainerRef.current.contains(e.relatedTarget);
            const isStillInMenu = menuRef.current.contains(e.relatedTarget);

            if (!isStillInLogoContainer && !isStillInMenu) {
                setMenuOpen(false);
            }
        };

        // Add global event listener
        document.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup listener on component unmount
        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">
                    Sign Up
                </Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className="nav-item">
            <a className="nav-link" href="#!" onClick={logout_user}>
                Logout
            </a>
        </li>
    );

    const logoMenu = () => (
        menuOpen && (
            <div
                ref={menuRef}
                className="menu"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
                style={{
                    position: 'absolute',
                    top: '50px',
                    left: '0',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: '1000',
                    width: '200px',
                    transition: 'opacity 0.3s ease-in-out',
                }}
            >
                <ul style={{ listStyle: 'none', padding: '10px', margin: '0' }}>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/subscribe" className="nav-link">
                                    Fund Services Subscription
                                </Link>
                            </li>
                            <li>
                                <Link to="/account_balance" className="nav-link">
                                    Account Balance
                                </Link>
                            </li>
                            <li>
                                <Link to="/top10" className="nav-link">
                                    Top 10
                                </Link>
                            </li>
                            <li>
                                <Link to="/analysis" className="nav-link">
                                    Stock Analysis
                                </Link>
                            </li>
                            <li>
                                <Link to="/home" className="nav-link">
                                    Other
                                </Link>
                            </li>
                            <li>
                                <Link to="/upload_file" className="nav-link">
                                    Upload Data
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="nav-link">
                                    Register for an Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/others" className="nav-link">
                                    Others
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        )
    );

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg">
                <div className="container d-flex justify-content-between">
                    {/* Left Side - Logo and Home */}
                    <div
                        ref={logoContainerRef}
                        className="logo-menu-container"
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => {
                            // Add a small delay to allow mouse to move between logo and menu
                            setTimeout(() => {
                                // Only close if not hovering over menu or logo
                                if (!logoContainerRef.current?.matches(':hover') && 
                                    !menuRef.current?.matches(':hover')) {
                                    setMenuOpen(false);
                                }
                            }, 100);
                        }}
                        style={{ position: 'relative' }}
                    >
                        {/* Logo */}
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                height: '40px',
                                marginRight: '10px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={() => (document.querySelector('img').style.transform = 'scale(1.1)')}
                            onMouseLeave={() => (document.querySelector('img').style.transform = 'scale(1)')}
                        />
                        {/* Dropdown Menu */}
                        {logoMenu()}
                    </div>

                    {/* Home Link */}
                    <Link className="nav-link" to="/">
                        Home
                    </Link>

                    {/* Center - Brand */}
                    <Link className="navbar-brand mx-auto" to="/">
                        First United Development
                    </Link>

                    {/* Right Side - Auth Buttons */}
                    <ul className="navbar-nav align-items-center">
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>
                </div>
            </nav>
            {redirect ? <Redirect to="/" /> : null}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);