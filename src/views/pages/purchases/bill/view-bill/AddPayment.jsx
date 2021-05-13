import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { format } from 'date-fns'
import { KeyboardDatePicker } from '@material-ui/pickers';

/** Actions */
import * as BILL from '../../../../../redux/modules/bill/actions';
import * as ACCOUNT from '../../../../../redux/modules/account/actions';
import * as CURRENCY from '../../../../../redux/modules/currency/actions';
import * as PAYMENT_METHOD from '../../../../../redux/modules/payment-method/actions';   

/** Selectors */
import { selectAccount } from '../../../../../redux/modules/account/selector';
import { selectCurrency } from '../../../../../redux/modules/currency/selector';
import { selectPaymentMethod } from '../../../../../redux/modules/payment-method/selector';   
import { selectBill } from '../../../../../redux/modules/bill/selector';

/** Material UI Icons */
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormHelperText, InputLabel, MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select';

/** Components */
import SaveCancelButtons from '../../../../../components/SaveCancelButtons';
import Grid from '@material-ui/core/Grid'

import * as DATE from '../../../../../utils/date'
import { createStructuredSelector } from 'reselect';


const ADD_PAYMENT_DEFAULT_PROPS = {
    id: 0,
    date: DATE.today(),
    amount: 0,
    account_id: 0,
    currency_id: 0,
    description: '',
    payment_method_id: 0,
    reference: ''
};

const AddPayment = ({ accountProp, currencyProp, paymentMethodProp, billProp, id }) => 
{
    const dispatch = useDispatch();

    const { error, isLoading } = billProp;

    const [ openAddPayment, setOpenAddPayment] = useState(false);
    const [ addPaymentState, setAddPaymentState ] = useState(ADD_PAYMENT_DEFAULT_PROPS);

    const handleChange = (e) => setAddPaymentState({ ...addPaymentState, [e.target.name]: e.target.value });

    const handleChangeDate = (date) => setAddPaymentState({ ...addPaymentState, date });

    const handleClickOpen = () => setOpenAddPayment(true);

    const addPayment = () => dispatch(BILL.payment({
        ...addPaymentState,
        id
    }));

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onLoadFetchPaymentMethods = () => dispatch(PAYMENT_METHOD.getPaymentMethods());

    useEffect(() => {
        onLoadFetchAccounts();
        onLoadFetchCurrencies();
        onLoadFetchPaymentMethods();
    }, []);

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
                setOpenAddPayment(false);
            }
        }

    }, [isLoading]);

    return (
        <div>
            <Button size='small' variant='outlined' color='primary' onClick={ handleClickOpen }>
                Add Payment
            </Button>
            <Dialog open={ openAddPayment } onClose={ addPayment } aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <KeyboardDatePicker
                                error={ Boolean(error.date) }
                                helperText={ error.date }
                                name='date'
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                value={ addPaymentState.date }
                                onChange={ handleChangeDate }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                error={ Boolean(error.amount) }
                                helperText={ error.amount }
                                name='amount'
                                label='Amount'
                                value={ addPaymentState.amount }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormControl fullWidth error={ Boolean(error.account_id) }>
                                <InputLabel>Account</InputLabel>
                                <Select
                                    name='account_id'
                                    value={ addPaymentState.account_id }
                                    onChange={ handleChange }
                                    fullWidth
                                    label='Account'
                                >
                                    {
                                        accountProp.accounts.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                    }
                                </Select>
                                <FormHelperText>{ error.account_id }</FormHelperText>
                            </FormControl>  
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormControl fullWidth error={ Boolean(error.currency_id) }>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    name='currency_id'
                                    value={ addPaymentState.currency_id }
                                    onChange={ handleChange }
                                    fullWidth
                                    label='Account'
                                >
                                    {
                                        currencyProp.currencies.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                    }
                                </Select>
                                <FormHelperText>{ error.currency_id }</FormHelperText>
                            </FormControl>  
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                error={ Boolean(error.description) }
                                helperText={ error.description }
                                name='description'
                                label='Enter description'
                                value={ addPaymentState.description }
                                onChange={ handleChange }
                                multiline
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FormControl fullWidth error={ Boolean(error.payment_method_id) }>
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    name='payment_method_id'
                                    value={ addPaymentState.payment_method_id }
                                    onChange={ handleChange }
                                    fullWidth
                                    label='Account'
                                >
                                    {
                                        paymentMethodProp.paymentMethods.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                    }
                                </Select>
                                <FormHelperText>{ error.payment_method_id }</FormHelperText>
                            </FormControl>  
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                error={ Boolean(error.reference) }
                                helperText={ error.reference }
                                name='reference'
                                label='Enter reference'
                                value={ addPaymentState.reference }
                                onChange={ handleChange }
                                multiline
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <SaveCancelButtons
                        isLoading={ isLoading }
                        cancelBtnCallback={ addPayment }
                        saveBtnCallback={ addPayment }
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    accountProp: selectAccount,
    currencyProp: selectCurrency,
    paymentMethodProp: selectPaymentMethod,
    billProp: selectBill
});

export default connect(mapStateToProps, null)(AddPayment)