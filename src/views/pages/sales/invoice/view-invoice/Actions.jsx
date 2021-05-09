import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

/** Actions */
import * as INVOICE from './../../../../../redux/modules/invoice/actions';

/** Selectors */
import { selectInvoice } from './../../../../../redux/modules/invoice/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

/** Material Icons */
import EditIcon from '@material-ui/icons/Edit';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddPayment from './AddPayment';
import PATH from './../../../../../routes/path';



const Actions = ({ invoiceDetails, isLoading, paymentDetail }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const sendMail = () => dispatch(INVOICE.mailCustomer({ 
        invoice_id: invoiceDetails.id, 
        customer_id: invoiceDetails?.customer.id 
    }));

    const markAsPaid = () => dispatch(INVOICE.markAsPaid({
        invoice_id: invoiceDetails.id, 
        customer_id: invoiceDetails?.customer.id,
        account_id: 1,
        payment_method_id: 1,
        amount: paymentDetail.amount_due
    }));

    return invoiceDetails.status !== 'Paid' && (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <EditIcon />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <div>
                                <Typography variant="h6" color="initial">
                                    Edit Invoice
                                </Typography>
                                <Typography variant="caption" color="initial">
                                    Status: { invoiceDetails?.created_at }
                                </Typography>
                            </div>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size='small'
                                onClick={ () =>  history.push(PATH.UPDATE_INVOICE.replace(':id', invoiceDetails.id)) }
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <ContactMailIcon />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <div>
                                <Typography variant='h6' color='initial'>
                                    Send Invoice
                                </Typography>
                                <Typography variant='caption' color='initial'>
                                    Status: { isLoading }
                                </Typography>
                            </div>
                            <Button 
                                variant='contained' 
                                color='secondary' 
                                size='small'
                                onClick={ sendMail }
                                disabled={ invoiceDetails.isLoading }
                            >
                                Send mail
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <MonetizationOnIcon />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="h6" color="initial">
                                        Get Paid
                                    </Typography>
                                    <Typography variant="caption" color="initial">
                                        Status: { 
                                            invoiceDetails.status !== 'Partially Paid' || invoiceDetails.status !== 'Paid' 
                                                ? 'Awaiting for payment' 
                                                : invoiceDetails.status 
                                            }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                size='small'
                                                onClick={ markAsPaid }
                                            >
                                                Mark as paid
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <AddPayment 
                                                invoiceAction={ INVOICE } 
                                                id={ invoiceDetails.id }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                                           
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Actions
