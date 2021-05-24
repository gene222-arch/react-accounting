import React,{ useState } from 'react';
import { format } from 'date-fns'

import { KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';



const ConvertToInvoiceDialog = ({ open, handleClickOpen, handleClickClose, convertToInvoice, setConvertToInvoice, convertToInvoiceCallback, estimateInvoiceDetails, disableBtnOnMarkedEstimate, isLoading, error }) => 
{
    const handleChange = (e) => setConvertToInvoice({ ...convertToInvoice, [e.target.name]: e.target.value });

    const handleChangeInvoiceDate = (date) => setConvertToInvoice({ ...convertToInvoice, date: format(date, 'yyyy-mm-dd') });

    const handleChangeDueDate = (date) => setConvertToInvoice({ ...convertToInvoice, date: format(date, 'yyyy-mm-dd') });

    return (
        <div>
            {
                !disableBtnOnMarkedEstimate()
                    ? (
                        <Button 
                            variant='contained' 
                            color='primary' 
                            onClick={ handleClickOpen }
                            disabled={ disableBtnOnMarkedEstimate() }
                        >
                            Convert
                        </Button>
                    )
                    : <Button variant='contained' color="default" disabled> Invoiced </Button>
            }
            <Dialog 
                open={ open } 
                onClose={ handleClickClose } 
                aria-labelledby='form-dialog-title' 
                disableBackdropClick
                disabled={ estimateInvoiceDetails.status === 'Invoiced' }
            >
                <DialogTitle id='form-dialog-title'>Convert Estimate to Invoice</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                error={ Boolean(error.invoice_number) }
                                helperText={ error.invoice_number }
                                name='invoice_number'
                                label='Invoice Number'
                                value={ convertToInvoice.invoice_number }
                                onChange={ handleChange }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                error={ Boolean(error.order_no) }
                                helperText={ error.order_no }
                                name='order_no'
                                label='Order Number'
                                value={ convertToInvoice.order_no }
                                onChange={ handleChange }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <InputLabel>Invoice Date</InputLabel>
                            <KeyboardDatePicker
                                error={ Boolean(error.date) }
                                helperText={ error.date }
                                name='invoiceDate'
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                value={ convertToInvoice.date }
                                onChange={ handleChangeInvoiceDate }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <InputLabel>Due Date</InputLabel>
                            <KeyboardDatePicker
                                error={ Boolean(error.due_date) }
                                helperText={ error.due_date }                        
                                name='dueDate'
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                value={ convertToInvoice.due_date }
                                onChange={ handleChangeDueDate }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={ handleClickClose } 
                        color='primary' 
                        disabled={ Boolean(isLoading) || disableBtnOnMarkedEstimate()}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={ convertToInvoiceCallback } 
                        color='primary' 
                        disabled={ Boolean(isLoading) || disableBtnOnMarkedEstimate()}
                    >
                        { isLoading ? 'Converting...' : 'Convert' }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default ConvertToInvoiceDialog