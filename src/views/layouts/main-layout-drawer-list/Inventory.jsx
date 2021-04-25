import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import ListAltIcon from '@material-ui/icons/ListAlt';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const Inventory = ({ 
    openInventory, 
    inventoryStockAdjustment,
    inventoryVendor,
    inventoryWarehouse,
    toggleInventory, 
    selectInventoryStockAdjustment,
    selectInventoryVendor,
    selectInventoryWarehouse,
    classes,
    permissions
}) => {

    const canManageStockAdjustments = permissions.includes('Manage Stock Adjustments');
    const canManageVendors = permissions.includes('Manage Vendors');
    const canManageWarehouses = permissions.includes('Manage Warehouses');

    if (!(canManageStockAdjustments || canManageVendors || canManageWarehouses)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ toggleInventory }>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary={'Inventory'} />
                { !openInventory ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openInventory } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Stock adjustments */}
                    {
                        canManageStockAdjustments && (
                            <ListItem button selected={ inventoryStockAdjustment } onClick={ selectInventoryStockAdjustment }>
                                <ListItemText primary={
                                    <Typography variant="subtitle2" color="initial">Stock adjustments</Typography>
                                }/>
                            </ListItem>
                        )
                    }

                    {/* Vendors */}
                    {
                        canManageVendors && (
                            <ListItem button selected={ inventoryVendor } onClick={ selectInventoryVendor }>
                                <ListItemText primary={
                                    <Typography variant="subtitle2" color="initial">Vendors</Typography>
                                }/>
                            </ListItem>
                        )
                    }
                    
                    {/* Warehouses */}
                    {
                        canManageWarehouses && (
                            <ListItem button selected={ inventoryWarehouse } onClick={ selectInventoryWarehouse }>
                                <ListItemText primary={
                                    <Typography variant="subtitle2" color="initial">Warehouses</Typography>
                                }/>
                            </ListItem>
                        )
                    }
                </List>
            </Collapse>            
        </>
    )
}

export default Inventory
