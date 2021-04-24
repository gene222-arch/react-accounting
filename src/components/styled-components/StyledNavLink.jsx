import React from 'react'
import { NavLink as NavLinkRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const navLinkUseStyles = makeStyles(theme => ({
    tableRowNavLink: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: blue[300]
        }
    }
}));

const StyledNavLink = ({ to, text }) => 
{
    const classes = navLinkUseStyles();

    return <NavLinkRouter to={ to } className={ classes.tableRowNavLink }>{ text }</NavLinkRouter>
}

export default StyledNavLink
