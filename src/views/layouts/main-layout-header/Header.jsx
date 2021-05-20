import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

/** Material UI Components */
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Menu, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';

/** Material UI Icons */
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import InvoiceIcon from '@material-ui/icons/MonetizationOn';
import RevenueIcon from '@material-ui/icons/AttachMoney';
import CustomerIcon from '@material-ui/icons/Face';
import BillIcon from '@material-ui/icons/RemoveShoppingCart';
import HeaderMenuItem from './HeaderMenuItem';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import PATH from './../../../routes/path';

const useStyles = makeStyles((theme) => ({
    userAvatar: {
        backgroundColor: '#2c2c2c',
        color: '#FFF'
    },
    addIconMenu: {
        width: '20rem'
    }
}))

const Header = ({ user, handleClickLogout }) => 
{
    const history = useHistory();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [add, setAdd] = useState(null);

    const handleClickAdd = (event) => setAdd(event.currentTarget);

    const handleCloseAdd = () => setAdd(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const logout = () => {
        handleClose();
        handleClickLogout();
    };

    return (
        <>
            <Grid container spacing={1} alignItems='center' justify='flex-end'>
                <Grid item>
                    <Button 
                        aria-controls="vertical-toolbar" 
                        aria-haspopup="true" 
                        style={{ backgroundColor: 'transparent' }}
                        onClick={ handleClickAdd }
                    >
                        <AddIcon />
                    </Button>
                    <Menu
                        id="header"
                        anchorEl={add}
                        keepMounted
                        open={Boolean(add)}
                        onClose={ handleCloseAdd }
                        PaperProps={{  
                            style: {  
                                width: 400,  
                                height: 300
                            },  
                        }}
                    >
                        <Grid container spacing={3} justify='center' alignItems='center'>
                            <Grid item xs={4} md={4} lg={4}>
                                <HeaderMenuItem 
                                    Icon={ InvoiceIcon }
                                    label='Invoice'
                                    handleClick={ () => history.push(PATH.CREATE_INVOICE) }
                                />
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <HeaderMenuItem 
                                    Icon={ RevenueIcon }
                                    label='Revenue'
                                    handleClick={ () => history.push(PATH.CREATE_REVENUE) }
                                />
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <HeaderMenuItem 
                                    Icon={ CustomerIcon }
                                    label='Customer'
                                    handleClick={ () => history.push(PATH.CREATE_CUSTOMER) }
                                />
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <HeaderMenuItem 
                                    Icon={ BillIcon }
                                    label='Bill'
                                    handleClick={ () => history.push(PATH.CREATE_BILL) }
                                />
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <HeaderMenuItem 
                                    Icon={ RevenueIcon }
                                    label='Payment'
                                    handleClick={ () => history.push(PATH.CREATE_PAYMENT) }
                                />
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <HeaderMenuItem 
                                    Icon={ CustomerIcon }
                                    label='Vendor'
                                    handleClick={ () => history.push(PATH.CREATE_VENDOR) }
                                />
                            </Grid>
                        </Grid>
                    </Menu>
                </Grid>
                <Grid item>
                    <Button variant="text" color="default" style={{ backgroundColor: 'transparent' }}>
                        <NotificationsActiveIcon />
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        aria-controls="vertical-toolbar" 
                        aria-haspopup="true" 
                        style={{ backgroundColor: 'transparent' }}
                        onClick={ handleClick }
                    >
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <Typography variant="h6" color="initial">
                                    <Avatar className={ classes.userAvatar }>{ user.first_name.substr(0, 1) }</Avatar> 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" color="initial">
                                    { user.first_name }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
                    <Menu
                        id="header"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={ handleClose }
                        PaperProps={{  
                            style: {  
                                width: 250,  
                            },  
                        }}
                    >
                        <MenuItem onClick={ logout }>Logout</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </>
    );
}

export default Header;