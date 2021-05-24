import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

/** Actions */
import * as ESTIMATE_INVOICE from './../../../../../redux/modules/estimate-invoice/actions';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

/** Material Icons */
import EditIcon from '@material-ui/icons/Edit';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PATH from './../../../../../routes/path';
import ConvertToInvoiceDialog from './ConvertToInvoiceDialog';


import * as DATE from './../../../../../utils/date'

const CONVERT_TO_INVOICE_DEFAULT_PROPS = {
    estimate_invoice_id: 0,
    invoice_number: 'INV-00000',
    order_no: 0,
    date: DATE.today(),
    due_date: DATE.today()
};

const Actions = ({ estimateInvoiceDetails, disableBtnOnMarkedEstimate, isLoading, error }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const [ convertToInvoice, setConvertToInvoice ] = useState(CONVERT_TO_INVOICE_DEFAULT_PROPS);
    const [ openConvertToInvoiceDialog, setOpenConvertToInvoiceDialog ] = useState(false);

    const handleClickOpenDialog = () => setOpenConvertToInvoiceDialog(true);

    const handleClickCloseDialog = () => setOpenConvertToInvoiceDialog(false);

    const convertToinvoice = () => dispatch(ESTIMATE_INVOICE.convertToInvoice({
        ...convertToInvoice,
        id: estimateInvoiceDetails.id
    }));

    const sendMail = () => dispatch(ESTIMATE_INVOICE.mailEstimateInvoiceCustomer({ 
        invoice_id: estimateInvoiceDetails.id, 
        customer_id: estimateInvoiceDetails.customer_id 
    }));

    const markAsApproved = () => dispatch(ESTIMATE_INVOICE.markAsApproved({ id: estimateInvoiceDetails.id }));

    const markAsRefused = () => dispatch(ESTIMATE_INVOICE.markAsRefused({ id: estimateInvoiceDetails.id }));

    useEffect(() => {
        
        let hasErrors = false;

        if (!isLoading) 
        {
            for (const key in error) {
                if (error[key]) {
                    hasErrors = true;
                }
            }

            if (!hasErrors) {
                handleClickCloseDialog();
            }
        }

    }, [isLoading]);


    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <EditIcon />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <div>
                                <Typography variant='h6' color='initial'>
                                    Edit Estimate Invoice
                                </Typography>
                                <Typography variant='caption' color='initial'>
                                    Status: { estimateInvoiceDetails?.created_at }
                                </Typography>
                            </div>
                            {
                                !disableBtnOnMarkedEstimate()
                                    ? (
                                        <Button 
                                            variant='contained' 
                                            color='primary' 
                                            size='small'
                                            onClick={ () =>  history.push(PATH.UPDATE_ESTIMATE_INVOICE.replace(':id', estimateInvoiceDetails.id)) }
                                        >
                                            Edit
                                        </Button>
                                    )
                                    : <Button variant='contained' color='primary' size='small' disabled> Edit </Button>
                            }
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
                                disabled={ isLoading }
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
                        <Grid item xs={10} sm={10} md={6} lg={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant='h6' color='initial'>
                                        Get Approved
                                    </Typography>
                                    <Typography variant='caption' color='initial'>
                                        Status: { 
                                            estimateInvoiceDetails.status !== 'Partially Approved' || estimateInvoiceDetails.status !== 'Approved' 
                                                ? 'Awaiting for payment' 
                                                : estimateInvoiceDetails.status 
                                            }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1} justify='flex-start'>
                                        <Grid item>
                                            <Button 
                                                variant='contained' 
                                                color='secondary' 
                                                size='small'
                                                onClick={ markAsApproved }
                                                disabled={ isLoading || disableBtnOnMarkedEstimate() }
                                            >
                                                Mark as approved
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button 
                                                variant='contained' 
                                                color='secondary' 
                                                size='small'
                                                onClick={ markAsRefused }
                                                disabled={ isLoading || disableBtnOnMarkedEstimate() }
                                            >
                                                Mark as refused
                                            </Button>
                                        </Grid>
                                    </Grid>
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
                                    <Typography variant='h6' color='initial'>
                                        Convert to Invoice
                                    </Typography>
                                    <Typography variant='caption' color='initial'>
                                        Status: { 
                                            estimateInvoiceDetails.status !== 'Converted to Invoice'
                                                ? 'Not invoiced' 
                                                : estimateInvoiceDetails.status 
                                            }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <ConvertToInvoiceDialog 
                                                open={ openConvertToInvoiceDialog }
                                                handleClickOpen={ handleClickOpenDialog }
                                                handleClickClose={ handleClickCloseDialog }
                                                convertToInvoice={ convertToInvoice }
                                                setConvertToInvoice={ setConvertToInvoice }
                                                convertToInvoiceCallback={ convertToinvoice }
                                                estimateInvoiceDetails={ estimateInvoiceDetails }
                                                disableBtnOnMarkedEstimate={ disableBtnOnMarkedEstimate }
                                                isLoading={ isLoading }
                                                error={ error }
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
