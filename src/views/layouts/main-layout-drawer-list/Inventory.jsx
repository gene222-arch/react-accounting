import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import ListAltIcon from '@material-ui/icons/ListAlt';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';


const Inventory = ({ 
    openInventory, 
    inventoryStockAdjustment,
    inventoryWarehouse,
    toggleInventory, 
    selectInventoryStockAdjustment,
    selectInventoryWarehouse,
    classes,
    permissions
}) => {

    const canManageStockAdjustments = permissions.includes('Manage Stock Adjustments');
    const canManageWarehouses = permissions.includes('Manage Warehouses');

    if (!(canManageStockAdjustments || canManageWarehouses)) {
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
                            <StyledNavLink to={ PATH.STOCK_ADJUSTMENT } text={ 
                                <ListItem button selected={ inventoryStockAdjustment } onClick={ selectInventoryStockAdjustment }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Stock adjustments</Typography>
                                    }/>
                                </ListItem>
                            }/>
                        )
                    }
                    
                    {/* Warehouses */}
                    {
                        canManageWarehouses && (
                            <StyledNavLink to={ PATH.WAREHOUSE } text={ 
                                <ListItem button selected={ inventoryWarehouse } onClick={ selectInventoryWarehouse }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Warehouses</Typography>
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

export default Inventory
