import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


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
    classes 
}) => {
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
                    <ListItem button selected={ salesDebitNote } onClick={ selectSalesDebitNote }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Debit Notes</Typography>
                        }/>
                    </ListItem>

                    {/* Estimates */}
                    <ListItem button selected={ salesEstimate } onClick={ selectSalesEstimate }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Estimates</Typography>
                        }/>
                    </ListItem>

                    {/* Invoices */}
                    <ListItem button selected={ salesInvoice } onClick={ selectSalesInvoice }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Invoices</Typography>
                        }/>
                    </ListItem>

                    {/* Revenues */}
                    <ListItem button selected={ salesRevenue } onClick={ selectSalesRevenue }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Revenues</Typography>
                        }/>
                    </ListItem>
                    
                    {/* Customers */}
                    <ListItem button selected={ salesCustomer } onClick={ selectSalesCustomer }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Customers</Typography>
                        }/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

export default Sales
