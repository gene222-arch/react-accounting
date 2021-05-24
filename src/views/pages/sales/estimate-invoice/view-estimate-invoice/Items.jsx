import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import { Card, CardContent, Typography } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

/** Material UI Icons */
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';

import MaterialTable from './../../../../../components/MaterialTable';


const Items = ({ auth, estimateInvoiceDetails, items, paymentDetail }) => 
{
    const column = [
        { field: 'id', hidden: true },
        { title: 'Item', field: 'item' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Price', field: 'price' },
        { title: 'Amount', field: 'amount' },
    ];

    const options = {
        selection: false,
        search: false
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container spacing={1} justify='center'>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <BusinessRoundedIcon />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="subtitle2" color="initial">
                                        { auth?.user?.email }
                                    </Typography>
                                    <Typography variant="subtitle1" color="initial">
                                        { auth?.user?.first_name }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="subtitle1" color="initial">{ estimateInvoiceDetails?.customer?.name }</Typography>
                                    <Typography variant="subtitle1" color="initial">{ estimateInvoiceDetails?.customer?.address }</Typography>
                                    <Typography variant="subtitle1" color="initial">{ estimateInvoiceDetails?.customer?.tax_number }</Typography>
                                    <Typography variant="subtitle1" color="initial">{ estimateInvoiceDetails?.customer?.email }</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={
                                                <Typography variant="subtitle1" color="initial">
                                                    <strong>Invoice number</strong>
                                                </Typography>
                                            } />
                                            <ListItemSecondaryAction>
                                                { estimateInvoiceDetails.estimate_number }
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={
                                                <Typography variant="subtitle1" color="initial">
                                                    <strong>Estimate Date</strong>
                                                </Typography>
                                            } />
                                            <ListItemSecondaryAction>
                                                { estimateInvoiceDetails.estimated_at }
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={
                                                <Typography variant="subtitle1" color="initial">
                                                    <strong>Expiry Date</strong>
                                                </Typography>
                                            } />
                                            <ListItemSecondaryAction>
                                                { estimateInvoiceDetails.expired_at }
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </Grid>                              
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <MaterialTable 
                                columns={ column }      
                                data={ items }  
                                options={ options }
                                title='Items'
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}></Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <List>
                                <ListItem>
                                    <ListItemText primary={
                                        <Typography variant="subtitle1" color="initial">
                                            <strong>Subtotal</strong>
                                        </Typography>
                                    } />
                                    <ListItemSecondaryAction>
                                        { paymentDetail?.sub_total }
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={
                                        <Typography variant="subtitle1" color="initial">
                                            <strong>Discount</strong>
                                        </Typography>
                                    } />
                                    <ListItemSecondaryAction>
                                        { paymentDetail.total_discounts }
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={
                                        <Typography variant="subtitle1" color="initial">
                                            <strong>Tax</strong>
                                        </Typography>
                                    } />
                                    <ListItemSecondaryAction>
                                        { paymentDetail.total_taxes }
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={
                                        <Typography variant="subtitle1" color="initial">
                                            <strong>Total</strong>
                                        </Typography>
                                    } />
                                    <ListItemSecondaryAction>
                                        { paymentDetail.total }
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Grid>
                    
                    </Grid>                    
                </CardContent>
            </Card>
        </>
    );

}

export default Items