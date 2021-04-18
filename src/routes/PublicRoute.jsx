import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

/** Utils */
import * as Cookie from '../utils/cookies'
import PATH from './path';

/** Selectors */
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';


const PublicRoute = ({ auth, Component, ...props }) => 
{
    const history = useHistory();

    return (
        <>
            {
                !auth.isAuthenticated
                    ? <Component { ...props } />
                    : history.push(PATH.DASHBOARD)
            }
        </>
    )
}

const mapStateToProps = (state) => createStructuredSelector({
    auth: selectAuth
})


export default connect(mapStateToProps, null)(PublicRoute);
