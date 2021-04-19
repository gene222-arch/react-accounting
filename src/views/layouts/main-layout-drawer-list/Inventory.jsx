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
    classes 
}) => {
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
                    <ListItem button selected={ inventoryStockAdjustment } onClick={ selectInventoryStockAdjustment }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Stock adjustments</Typography>
                        }/>
                    </ListItem>

                    {/* Vendors */}
                    <ListItem button selected={ inventoryVendor } onClick={ selectInventoryVendor }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Vendors</Typography>
                        }/>
                    </ListItem>
                    
                    {/* Warehouses */}
                    <ListItem button selected={ inventoryWarehouse } onClick={ selectInventoryWarehouse }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Warehouses</Typography>
                        }/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

export default Inventory
