import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../redux/modules/auth/selector';

/** Components */
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const NotFound = lazy(() => import('../views/pages/errors/NotFound'))

const RenderRoutes = ({ auth, routes }) => 
{
    return (
        <Switch>
            {
                routes.map(({ key, path, strict, exact, restricted, component: Component }) => (
                    <Route
                        key={ key }
                        path={ path }
                        strict={ strict }
                        exact={ exact }
                        render={ props => {
                            return restricted 
                                ? <PrivateRoute isAuthenticated={ auth.isAuthenticated } component={ Component } { ...props }/>
                                : <PublicRoute isAuthenticated={ auth.isAuthenticated } component={ Component } { ...props } />
                        }}
                    />
                ))
            }
            <Route component={NotFound} />
        </Switch>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: selectAuth
}); 

export default connect(mapStateToProps, null)(RenderRoutes);
