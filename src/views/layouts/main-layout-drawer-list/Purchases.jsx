import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/** Components */
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';


const Purchases = ({ 
    openPurchases, 
    purchasesCreditNote,
    purchasesBill,
    purchasesPayment,
    purchasesVendor,
    togglePurchases, 
    selectPurchasesCreditNote, 
    selectPurchasesBill,
    selectPurchasesPayment,
    selectPurchasesVendor,
    classes,
    permissions
}) => {

    const canManageVendors = permissions.includes('Manage Vendors');
    const canManageCreditNotes = permissions.includes('Manage Credit Notes');
    const canManageBills = permissions.includes('Manage Bills');
    const canManagePayments = permissions.includes('Manage Payments');

    if (!(canManageCreditNotes || canManageBills || canManagePayments || canManageVendors)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ togglePurchases }>
                <ListItemIcon>
                    <ShoppingCartIcon fontSize='small'/>
                </ListItemIcon>
                <ListItemText primary={'Purchases'} />
                { !openPurchases ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openPurchases } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Credit Notes */}
                    {
                        canManageCreditNotes && (
                            <ListItem button selected={ purchasesCreditNote } onClick={ selectPurchasesCreditNote }>
                                <ListItemText primary={
                                    <Typography variant="subtitle2" color="initial">Credit Notes</Typography>
                                }/>
                            </ListItem>
                        )
                    }

                    {/* Bills */}
                    {
                        canManageBills && (
                            <StyledNavLink to={ PATH.BILL } text={
                                <ListItem button selected={ purchasesBill } onClick={ selectPurchasesBill }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Bills</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }

                    {/* Payments */}
                    {
                        canManagePayments && (
                            <StyledNavLink to={ PATH.PAYMENT } text={
                                <ListItem button selected={ purchasesPayment } onClick={ selectPurchasesPayment }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Payments</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }
                    {/* Vendors */}
                    {
                        canManageVendors && (
                            <StyledNavLink to={ PATH.VENDOR } text={
                                <ListItem button selected={ purchasesVendor } onClick={ selectPurchasesVendor }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Vendors</Typography>
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

export default Purchases
