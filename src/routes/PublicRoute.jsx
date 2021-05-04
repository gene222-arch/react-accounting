import React from 'react'
import { useHistory } from 'react-router-dom'

import PATH from './path';



const PublicRoute = ({ isAuthenticated = false, component: Component, ...props }) => 
{
    const history = useHistory();

    return (
        <>
            {
                !isAuthenticated
                    ? <Component { ...props } />
                    : history.push(PATH.MAIN_DASHBOARD)
            }
        </>
    )
}

export default PublicRoute;
