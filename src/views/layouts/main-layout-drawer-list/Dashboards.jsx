import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/** Components */
import StyledNavLink from '../../../components/styled-components/StyledNavLink'

import PATH from './../../../routes/path';


const Dashboards = ({ 
    openDashboards, 
    toggleDashboards, 
    mainDashboard, 
    payrollDashboard, 
    doubleEntryDashboard, 
    selectMainDashboard, 
    selectPayrollDashboard, 
    selectDoubleEntryDashboard,
    classes,
    permissions
}) => {

    const canViewDoubleEntryDashboard = permissions.includes('View Double Entry Dashboard');
    const canViewMainDashboard = permissions.includes('View Main Dashboard');
    const canViewPayrollDashboard = permissions.includes('View Payroll Dashboard');

    if (!(canViewDoubleEntryDashboard || canViewMainDashboard || canViewPayrollDashboard)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ toggleDashboards }>
                <ListItemIcon>
                    <DashboardIcon fontSize='small'/>
                </ListItemIcon>
                <ListItemText primary={'Dashboards'} />
                { !openDashboards ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openDashboards } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Main dashboard */}
                    {
                        canViewMainDashboard && (
                            <StyledNavLink to={ PATH.MAIN_DASHBOARD } text= {
                                <ListItem button selected={ mainDashboard } onClick={ selectMainDashboard }>
                                   <ListItemText primary={
                                       <Typography variant="subtitle2" color="initial">Main</Typography>
                                   }/>
                               </ListItem>
                            } />
                        )
                    }

                    {/* Payroll dashboard */}
                    {
                        canViewPayrollDashboard && (
                            <StyledNavLink to={ PATH.PAYROLL_DASHBOARD } text= {
                                <ListItem button selected={ payrollDashboard } onClick={ selectPayrollDashboard }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Payroll</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }

                    {/* Double entry dashboard */}
                    {
                        canViewDoubleEntryDashboard && (
                            <StyledNavLink to={ PATH.DOUBLE_ENTRY_DASHBOARD } text= {
                                <ListItem button selected={ doubleEntryDashboard } onClick={ selectDoubleEntryDashboard }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Double Entry</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }
                </List>
            </Collapse>            
        </>
    )
}

export default Dashboards
