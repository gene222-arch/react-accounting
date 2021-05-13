import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { KeyboardDatePicker } from '@material-ui/pickers';

/** Actions */
import * as CURRENCY from '../../../redux/modules/currency/actions';

/** Selectors */
import { selectCurrency } from '../../../redux/modules/currency/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { InputLabel, FormControl, FormHelperText, Select, MenuItem } from '@material-ui/core'



const Salary = ({ currencyProp, salaryState, setSalaryState, error }) => 
{
    const dispatch = useDispatch();

    const handleChangeSalary = (e) => setSalaryState({ ...salaryState, [e.target.name]: e.target.value });

    const handleChangeHireDate = (date) => setSalaryState({ ...salaryState, hired_at: date });

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    useEffect(() => {
        onLoadFetchCurrencies();
    }, []);

    return (
        <div>
             <Grid container spacing={1} alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Amount</InputLabel>
                    <TextField
                        fullWidth
                        name='amount'
                        error={ Boolean(error.amount) }
                        helperText={ error.amount }
                        label='Enter Amount'
                        value={ salaryState.amount }
                        onChange={ handleChangeSalary }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <FormControl error={ Boolean(error.currency_id) } fullWidth>
                        <InputLabel>Currency</InputLabel>
                        <Select
                            value={ salaryState.currency_id }
                            onChange={ handleChangeSalary }
                            inputProps={{
                                name: 'currency_id'
                            }}
                            fullWidth
                        >
                            {
                                currencyProp.currencies.map(({ id, name }) => (
                                    <MenuItem key={ id } value={ id }>
                                        { name }
                                    </MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>{ error.currency_id || '' }</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Tax number</InputLabel>
                    <TextField
                        fullWidth
                        name='tax_number'
                        error={ Boolean(error.tax_number) }
                        helperText={ error.tax_number }
                        label='Enter Tax number'
                        value={ salaryState.tax_number }
                        onChange={ handleChangeSalary }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Bank account number</InputLabel>
                    <TextField
                        fullWidth
                        name='bank_account_number'
                        error={ Boolean(error.bank_account_number) }
                        helperText={ error.bank_account_number }
                        label='Enter Bank number'
                        value={ salaryState.bank_account_number }
                        onChange={ handleChangeSalary }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <InputLabel>Hire date</InputLabel>
                    <KeyboardDatePicker
                        name='dateFrom'
                        variant='inline'
                        format='yyyy-MM-dd'
                        margin='normal'
                        value={ salaryState.hired_at }
                        onChange={ handleChangeHireDate }
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </Grid>                           
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currencyProp: selectCurrency,
});

export default connect(mapStateToProps, null)(Salary)


