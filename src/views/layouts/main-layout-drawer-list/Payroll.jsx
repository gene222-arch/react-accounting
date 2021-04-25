import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const Payroll = ({ 
    openPayroll, 
    payrollPayCalendar,
    payrollRunPayroll,
    togglePayroll, 
    selectPayrollPayCalendar,
    selectPayrollRunPayroll,
    classes,
    permissions 
}) => {

    const canManagePayCalendars = permissions.includes('Manage Pay Calendars');
    const canManagePayrolls = permissions.includes('Manage Payrolls');

    if (!(canManagePayCalendars || canManagePayrolls)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ togglePayroll }>
                <ListItemIcon>
                    <MoneyOffIcon />
                </ListItemIcon>
                <ListItemText primary={'Payroll'} />
                { !openPayroll ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openPayroll } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Pay Calendar */}
                    {
                        canManagePayCalendars && (
                            <ListItem button selected={ payrollPayCalendar } onClick={ selectPayrollPayCalendar }>
                                <ListItemText primary={
                                    <Typography variant="subtitle2" color="initial">Pay Calendar</Typography>
                                }/>
                            </ListItem>
                        )
                    }

                    {/* Run Payroll */}
                    {
                        canManagePayrolls && (
                            <ListItem button selected={ payrollRunPayroll } onClick={ selectPayrollRunPayroll }>
                                <ListItemText primary={
                                    <Typography variant="subtitle2" color="initial">Run Payroll</Typography>
                                }/>
                            </ListItem>
                        )
                    }
                </List>
            </Collapse>            
        </>
    )
}

export default Payroll
