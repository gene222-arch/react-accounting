import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

/** Actions */
import * as BILL from '../../../../../redux/modules/bill/actions';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

/** Material Icons */
import EditIcon from '@material-ui/icons/Edit';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddPayment from './AddPayment';
import PATH from '../../../../../routes/path';




const Actions = ({ billDetails, isLoading, paymentDetail }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const sendMail = () => dispatch(BILL.mailVendor({ 
        bill_id: billDetails.id, 
        vendor_id: billDetails.vendor_id
    }));

    const markAsPaid = () => dispatch(BILL.markAsPaid({
        bill_id: billDetails.id, 
        vendor_id: billDetails.vendor_id,
        currency_id: billDetails.currency_id,
        expense_category_id: billDetails.expense_category_id,
        account_id: 1,
        payment_method_id: 1,
        amount: paymentDetail.amount_due
    }));

    const markAsReceived = () => dispatch(BILL.markAsReceived({ bill_id: billDetails.id }));

    return billDetails.status !== 'Paid' && (
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
                                    Edit Bill
                                </Typography>
                                <Typography variant="caption" color="initial">
                                    { `Status ${ billDetails?.created_at }` }
                                </Typography>
                            </div>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size='small'
                                onClick={ () =>  history.push(PATH.UPDATE_BILL.replace(':id', billDetails.id)) }
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
                                    Send Bill
                                </Typography>
                                <Typography variant='caption' color='initial'>
                                    { `Status: ${ isLoading }` }
                                </Typography>
                            </div>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button 
                                        variant='contained' 
                                        color='secondary' 
                                        size='small'
                                        onClick={ markAsReceived }
                                        disabled={ billDetails.isLoading }
                                    >
                                        Mark as received
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant='contained' 
                                        color='primary' 
                                        size='small'
                                        onClick={ sendMail }
                                        disabled={ billDetails.isLoading }
                                    >
                                        Send mail
                                    </Button>
                                </Grid>
                            </Grid>
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
                                            billDetails.status !== 'Partially Paid' || billDetails.status !== 'Paid' 
                                                ? 'Awaiting for payment' 
                                                : billDetails.status 
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
                                            <AddPayment id={ billDetails.id } />
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
