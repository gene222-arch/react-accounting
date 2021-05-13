import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers';

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'


const BillDetail = ({ billState, billDate, handleChangeBillDate, dueDate, handleChangeDueDate, handleChange, error }) => {
    return (
        <div>
            <Grid container spacing={1} alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Date</InputLabel>
                    <KeyboardDatePicker
                        name='dateFrom'
                        variant='inline'
                        format='yyyy-MM-dd'
                        margin='normal'
                        value={ billDate }
                        onChange={ handleChangeBillDate }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Bill Number</InputLabel>
                    <TextField
                        fullWidth
                        name='bill_number'
                        error={ Boolean(error.bill_number) }
                        helperText={ error.bill_number }
                        value={ billState.bill_number }
                        onChange={ handleChange }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Due date</InputLabel>
                    <KeyboardDatePicker
                        name='dueDate'
                        variant='inline'
                        format='yyyy-MM-dd'
                        margin='normal'
                        value={ dueDate }
                        onChange={ handleChangeDueDate }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid> 
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Order number</InputLabel>
                    <TextField
                        fullWidth
                        name='order_no'
                        error={ Boolean(error.order_no) }
                        helperText={ error.order_no }
                        value={ billState.order_no }
                        onChange={ handleChange }
                    />
                </Grid> 
            </Grid>
        </div>
    )
}

export default BillDetail
