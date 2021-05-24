import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/** Components */
import StyledNavLink from './../../../components/styled-components/StyledNavLink';

import PATH from './../../../routes/path';


const Sales = ({ 
    openSales, 
    salesDebitNote,
    salesInvoice,
    salesEstimate,
    salesRevenue,
    salesCustomer,
    toggleSales, 
    selectSalesDebitNote,
    selectSalesInvoice,
    selectSalesEstimate,
    selectSalesRevenue,
    selectSalesCustomer,
    classes,
    permissions
}) => {

    const canManageDebitNotes = permissions.includes('Manage Debit Notes');
    const canManageEstimates = permissions.includes('Manage Estimate Invoices');
    const canManageInvoices = permissions.includes('Manage Invoices');
    const canManageRevenues = permissions.includes('Manage Revenues');
    const canManageCustomers = permissions.includes('Manage Customers');

    if (!(canManageDebitNotes || canManageEstimates || canManageInvoices || canManageRevenues || canManageCustomers)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ toggleSales }>
                <ListItemIcon>
                    <LocalAtmIcon fontSize='small'/>
                </ListItemIcon>
                <ListItemText primary={'Sales'} />
                { !openSales ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openSales } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Debit Notes */}
                    {
                        canManageDebitNotes && (
                            <ListItem button selected={ salesDebitNote } onClick={ selectSalesDebitNote }>
                                <ListItemText primary={
                                    <Typography variant="subtitle2" color="initial">Debit Notes</Typography>
                                }/>
                            </ListItem>
                        )
                    }

                    {/* Estimates */}
                    {
                        canManageEstimates && (
                            <StyledNavLink to={ PATH.ESTIMATE_INVOICE } text={ 
                                <ListItem button selected={ salesEstimate } onClick={ selectSalesEstimate }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Estimates</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }

                    {/* Invoices */}
                    {
                        canManageInvoices && (
                            <StyledNavLink to={ PATH.INVOICE } text={ 
                                <ListItem button selected={ salesInvoice } onClick={ selectSalesInvoice }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Invoices</Typography>
                                    }/>
                                </ListItem>
                            }
                            />
                        )
                    }

                    {/* Revenues */}
                    {
                        canManageRevenues && (
                            <StyledNavLink to={ PATH.REVENUE } text={
                                <ListItem button selected={ salesRevenue } onClick={ selectSalesRevenue }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Revenues</Typography>
                                    }/>
                                </ListItem>
                            }
                            />
                        )
                    }
                    
                    {/* Customers */}
                    {
                        canManageCustomers && (
                            <StyledNavLink to={ PATH.CUSTOMER } text={
                                <ListItem button selected={ salesCustomer } onClick={ selectSalesCustomer }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Customers</Typography>
                                    }/>
                                </ListItem>
                            }
                            />
                        )
                    }
                </List>
            </Collapse>            
        </>
    )
}

export default Sales
