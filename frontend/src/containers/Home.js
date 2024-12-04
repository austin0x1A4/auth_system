import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { load_user } from '../actions/auth';  // Action to load user data

const Home = ({ isAuthenticated, user, load_user }) => {
    useEffect(() => {
        // Load user data if authenticated
        if (isAuthenticated && !user) {
            load_user(); // Dispatch the load_user action to fetch the user data
        }
    }, [isAuthenticated, load_user, user]);  // Re-run when authentication or user state changes

    return (
        <div className="container">
            <div className="jumbotron mt-5">
                <h1 className="display-4">Welcome to Auth System!</h1>
                <p className="lead">This is an incredible authentication system with production-level features!</p>
                <hr className="my-4" />

                {/* Conditional rendering based on authentication */}
                {!isAuthenticated ? (
                    <>
                        <p>Click the Log In button to start using the system.</p>
                        <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
                        <ul>
                            <li>
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li>
                                <Link to="/register" className="nav-link">Register for an Account</Link>
                            </li>
                            <li>
                                <Link to="/others" className="nav-link">Others</Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <p>You are logged in! Choose an option:</p>
                        {user ? (
                            <div>
                                <h3>Welcome, {user.first_name} {user.last_name}!</h3>
                                <p>Email: {user.email}</p>
                            </div>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                        <ul>
                            <li>
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li>
                                <Link to="/subscribe" className="nav-link">Fund Services Subscription</Link>
                            </li>
                            <li>
                                <Link to="/account_balance" className="nav-link">Account Balance</Link>
                            </li>
                            <li>
                                <Link to="/top10" className="nav-link">Top 10</Link>
                            </li>
                            <li>
                                <Link to="/analysis" className="nav-link">Stock Analysis</Link>
                            </li>
                            <li>
                                <Link to="/home" className="nav-link">Other</Link>
                            </li>
                            <Fragment>
                                <li>
                                    <Link to="/upload_file" className="nav-link">Upload Data</Link>
                                </li>
                            </Fragment>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

// Map state to props
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated, // Get authentication status from Redux store
    user: state.auth.user,  // Get user data from Redux store
});

// Map dispatch to props
const mapDispatchToProps = {
    load_user,  // Load user data action
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
