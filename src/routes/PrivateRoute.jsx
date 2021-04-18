import React from 'react'
import { connect } from 'react-redux';

/** Utils */
import * as Cookie from '../utils/cookies'

/** Selectors */
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';

/** Components */
import Forbidden from './../views/pages/errors/Forbidden';


const PrivateRoute = ({ auth, Component, ...props }) => 
{
    return (
        <>
            {
                !auth.isAuthenticated
                    ? <Forbidden />
                    : <Component { ...props } />
            }
        </>
    )
}

const mapStateToProps = () => createStructuredSelector({
    auth: selectAuth
})

export default connect(mapStateToProps, null)(PrivateRoute);
