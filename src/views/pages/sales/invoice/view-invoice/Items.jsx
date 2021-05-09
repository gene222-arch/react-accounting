import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Table, TableRow, TableCell } from '@material-ui/core';

/** Material UI Icons */
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';

import MaterialTable from './../../../../../components/MaterialTable';


const Items = ({ auth, invoiceDetails, items, paymentDetail }) => 
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
                                    <Typography variant="subtitle1" color="initial">{ invoiceDetails?.customer?.name }</Typography>
                                    <Typography variant="subtitle1" color="initial">{ invoiceDetails?.customer?.address }</Typography>
                                    <Typography variant="subtitle1" color="initial">{ invoiceDetails?.customer?.tax_number }</Typography>
                                    <Typography variant="subtitle1" color="initial">{ invoiceDetails?.customer?.email }</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Table>
                                    <TableRow>
                                        <TableCell align='left'><strong>Invoice number:</strong></TableCell>
                                        <TableCell align='right'>{ invoiceDetails?.invoice_number }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'><strong>Order Number:</strong></TableCell>
                                        <TableCell align='right'>{ invoiceDetails?.order_no }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'><strong>Invoice Date:</strong></TableCell>
                                        <TableCell align='right'>{ invoiceDetails?.date }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='left'><strong>Due Date:</strong></TableCell>
                                        <TableCell align='right'>{ invoiceDetails?.due_date } </TableCell>
                                    </TableRow>
                                </Table>
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
                            <Table>
                                <TableRow>
                                    <TableCell align='left'><strong>Subtotal</strong></TableCell>
                                    <TableCell align='right'>{ paymentDetail?.sub_total }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'><strong>Discount</strong></TableCell>
                                    <TableCell align='right'>{ paymentDetail?.total_discounts }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'><strong>Tax</strong></TableCell>
                                    <TableCell align='right'>{ paymentDetail?.total_taxes }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'><strong>Total</strong></TableCell>
                                    <TableCell align='right'>{ paymentDetail?.total } </TableCell>
                                </TableRow>
                            </Table>
                        </Grid>
                    
                    </Grid>                    
                </CardContent>
            </Card>
        </>
    );

}

export default Items