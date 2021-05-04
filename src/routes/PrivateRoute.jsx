import React from 'react'

/** Components */
import Forbidden from './../views/pages/errors/Forbidden';


const PrivateRoute = ({ isAuthenticated = false, component: Component, ...props }) => 
{
    return (
        <>
            {
                !isAuthenticated
                    ? <Forbidden />
                    : <Component { ...props } />
            }
        </>
    )
}

export default PrivateRoute;
