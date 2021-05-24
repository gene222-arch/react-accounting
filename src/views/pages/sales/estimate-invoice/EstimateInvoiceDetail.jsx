import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers';

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'


const EstimateInvoiceDetail = ({ estimateInvoiceState, estimatedAt, handleChangeEstimateDate, expiredAt, handleChangeExpiryDate, handleChange, error }) => {
    return (
        <div>
            <Grid container spacing={1} alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Estimate Date</InputLabel>
                    <KeyboardDatePicker
                        name='estimatedAt'
                        variant='inline'
                        format='yyyy-MM-dd'
                        margin='normal'
                        value={ estimatedAt }
                        onChange={ handleChangeEstimateDate }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Expiry date</InputLabel>
                    <KeyboardDatePicker
                        name='expiredAt'
                        variant='inline'
                        format='yyyy-MM-dd'
                        margin='normal'
                        value={ expiredAt }
                        onChange={ handleChangeExpiryDate }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid> 
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Estimate Number</InputLabel>
                    <TextField
                        fullWidth
                        name='estimate_number'
                        error={ Boolean(error.estimate_number) }
                        helperText={ error.estimate_number }
                        value={ estimateInvoiceState.estimate_number }
                        onChange={ handleChange }
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default EstimateInvoiceDetail
