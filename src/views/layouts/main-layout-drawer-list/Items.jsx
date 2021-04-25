import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/** Components */
import StyledNavLink from '../../../components/styled-components/StyledNavLink'

import PATH from './../../../routes/path';


const Items = ({ 
    openItems, 
    itemsItem,
    itemsCategory,
    itemsDiscount,
    toggleItems, 
    selectItemsItem,
    selectItemsCategory,
    selectItemsDiscount,
    classes,
    permissions
}) => {

    const canManageItems = permissions.includes('Manage Items');
    const canManageCategories = permissions.includes('Manage Categories');
    const canManageDiscounts = permissions.includes('Manage Discounts');

    if (!(canManageItems || canManageCategories || canManageDiscounts)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ toggleItems }>
                <ListItemIcon>
                    <ShoppingBasketIcon fontSize='small'/>
                </ListItemIcon>
                <ListItemText primary={'Items'} />
                { !openItems ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openItems } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Item */}
                    {
                        canManageItems && (
                            <StyledNavLink to={ PATH.ITEM } text={ 
                                <ListItem button selected={ itemsItem } onClick={ selectItemsItem }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Item</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }

                    {/* Category */}
                    {
                        canManageCategories && (
                            <StyledNavLink to={ PATH.CATEGORY } text={ 
                                <ListItem button selected={ itemsCategory } onClick={ selectItemsCategory }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Category</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }
                    
                    {/* Discount */}
                    {
                        canManageDiscounts && (
                            <StyledNavLink to={ PATH.DISCOUNT } text={ 
                                <ListItem button selected={ itemsDiscount } onClick={ selectItemsDiscount }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Discount</Typography>
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

export default Items
