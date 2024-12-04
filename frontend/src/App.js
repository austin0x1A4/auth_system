import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from './actions/auth';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Facebook from './containers/Facebook';
import Google from './containers/Google';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = ({ checkAuthenticated, load_user, isAuthenticated, isLoading }) => {
    useEffect(() => {
        checkAuthenticated(); // Check if the user is authenticated
    }, [checkAuthenticated]);

    useEffect(() => {
        // Only load user data if authenticated
        if (isAuthenticated) {
            load_user();  // Fetch the user data if authenticated
        }
    }, [isAuthenticated, load_user]);

    if (isLoading) {
        // Show a loading spinner or skeleton loader while checking authentication
        return <div>Loading...</div>;
    }

    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/facebook' component={Facebook} />
                        <Route exact path='/google' component={Google} />
                        <Route exact path='/reset-password' component={ResetPassword} />
                        <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                        <Route exact path='/activate/:uid/:token' component={Activate} />
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,  // Getting authentication status
    isLoading: state.auth.isLoading,  // Getting loading state
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(App);
