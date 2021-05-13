import React, { useState } from 'react'

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { Menu, MenuItem } from '@material-ui/core';
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';

/** Material UI Icons */
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const Header = ({ billDetails, paymentDetail }) => 
{
    const { bill_number, status, vendor, due_date } = billDetails;

    const [ anchorEl, setAnchorEl ] = useState(null);

    const handleClickShowMenu = (e) => setAnchorEl(e.currentTarget);

    const handleClickHideMenu = () => setAnchorEl(null);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1} justify='space-between'>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography variant="h5" color="initial">
                                Bill: { bill_number }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Grid container spacing={1} justify='flex-end'>
                                <Grid item>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        aria-controls="simple-menu" 
                                        aria-haspopup="true" 
                                        onClick={ handleClickShowMenu }
                                        startIcon={ <ArrowDropDownIcon /> }
                                    >
                                        More Actions
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={ anchorEl }
                                        keepMounted
                                        open={ Boolean(anchorEl) }
                                        onClose={ handleClickHideMenu }
                                        PaperProps={{  
                                            style: {  
                                                width: 350,  
                                            },  
                                        }} 
                                    >
                                        <MenuItem onClick={ handleClickHideMenu }>Print</MenuItem>
                                        <MenuItem onClick={ handleClickHideMenu }>PDF</MenuItem>
                                        <MenuItem onClick={ handleClickHideMenu }>Cancel</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={ handleClickHideMenu }>Delete</MenuItem>
                                    </Menu>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Add new
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>                    
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table align='center'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>Vendor</TableCell>
                                <TableCell>Amount due</TableCell>
                                <TableCell>Due date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>{ status }</strong></TableCell>
                                <TableCell><strong>{ vendor?.name }</strong></TableCell>
                                <TableCell><strong>{ paymentDetail.amount_due }</strong></TableCell>
                                <TableCell><strong>{ due_date }</strong></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>
    )
}

export default Header
