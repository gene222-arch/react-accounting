import React from 'react'

/** Material UI Components */
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'

const authLayoutUseStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
        alignItems: 'center'
    }
}));

const AuthLayout = ({ children }) => 
{
    const classes = authLayoutUseStyles();

    return (
        <Container maxWidth="xl" className={ classes.root }>
            { children }
        </Container>
    )
}

export default AuthLayout
