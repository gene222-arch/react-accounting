import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { KeyboardDatePicker } from '@material-ui/pickers';

/** Selectors */
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectAccount } from './../../../../redux/modules/account/selector';
import { selectPaymentMethod } from './../../../../redux/modules/payment-method/selector';
import { selectBankAccountTransfer } from './../../../../redux/modules/bank-account-transfer/selector';

/** Actions */
import * as ACCOUNT from './../../../../redux/modules/account/actions';
import * as BANK_ACCOUNT_TRANSFER from './../../../../redux/modules/bank-account-transfer/actions';
import * as PAYMENT_METHOD from './../../../../redux/modules/payment-method/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl, FormHelperText } from '@material-ui/core'
import { Card, CardContent, CardActions } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import InputAdornment from '@material-ui/core/InputAdornment'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../components/AlertPopUp';

/** Material UI Icons */
import LocalAtmIcon from '@material-ui/icons/LocalAtm';


import PATH from '../../../../routes/path';

const CreateBankAccountTransfer = ({ 
    alert, 
    accountProp,
    bankAccountTransferProp,
    paymentMethodProp
    }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, bankAccountTransfer, error } = bankAccountTransferProp;

    const [ bankAccountTransferState, setBankAccountTransferState ] = useState(bankAccountTransfer);

    const handleChange = (e) => 
    {
        const { name, value } = e.target;
    
        if (name === 'from_account_id') 
        {
            const { id: from_account_id, balance } = accountProp.accounts.find(({ id }) => id === parseInt(value));
            const { amount } = bankAccountTransferState;

            if (balance < amount) {
                dispatch(ALERT.showAlert({
                    status: 'error',
                    message: `The selected account current balance is not enough, either select a new account or change the amount\n balance ${ balance }`
                }));
            }
            else {
                setBankAccountTransferState({ ...bankAccountTransferState, from_account_id });
            }
        }

        if (name === 'amount') 
        {
            const { balance } = accountProp.accounts.find(({ id }) => id === bankAccountTransferState.from_account_id);
            const amount = parseFloat(value);

            if (balance < amount) {
                dispatch(ALERT.showAlert({
                    status: 'error',
                    message: `The amount exceeded the selected from account current balance\n ${ balance }`
                }));
            }
            else {
                setBankAccountTransferState({ ...bankAccountTransferState, amount });
            }
        }

        if (name !== 'from_account_id' && name !== 'amount') {
            setBankAccountTransferState({ ...bankAccountTransferState, [name]: value });
        }
    };

    const handleChangeDate = (date) => setBankAccountTransferState({ ...bankAccountTransferState, transferred_at: date });

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onLoadFetchPaymentMethods = () => dispatch(PAYMENT_METHOD.getPaymentMethods());

    const onSubmitCreateTransfer = (e) => {
        e.preventDefault();
        dispatch(BANK_ACCOUNT_TRANSFER.createBankAccountTransfer(bankAccountTransferState));
    }

    useEffect(() => {
        onLoadFetchAccounts();
        onLoadFetchPaymentMethods();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitCreateTransfer }>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} alignItems='center'>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Date</InputLabel>
                                <KeyboardDatePicker
                                    error={ Boolean(error.transferred_at) }
                                    helperText={ error.transferred_at }
                                    name='dateFrom'
                                    variant='outlined'
                                    format='yyyy-MM-dd'
                                    margin='normal'
                                    value={ bankAccountTransferState.transferred_at }
                                    onChange={ handleChangeDate }
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel htmlFor='amount'>Amount</InputLabel>
                                <TextField
                                    id='amount'
                                    fullWidth
                                    name='amount'
                                    variant='outlined'
                                    error={ Boolean(error.amount) }
                                    helperText={ error.amount }
                                    value={ bankAccountTransferState.amount }
                                    onChange={ handleChange }
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <LocalAtmIcon />
                                          </InputAdornment>
                                        ),
                                    }}
                                    disabled={ !Boolean(bankAccountTransferState.from_account_id) }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.from_account_id) } fullWidth>
                                    <InputLabel>From Account</InputLabel>
                                    <Select
                                        name='from_account_id'
                                        variant='outlined'
                                        value={ bankAccountTransferState.from_account_id }
                                        onChange={ handleChange }
                                        fullWidth
                                    >
                                        {
                                            accountProp.accounts.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                        }
                                    </Select>
                                    <FormHelperText>{ error.from_account_id }</FormHelperText>
                                </FormControl> 
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.to_account_id) } fullWidth>
                                    <InputLabel>To Account</InputLabel>
                                    <Select
                                        name='to_account_id'
                                        variant='outlined'
                                        value={ bankAccountTransferState.to_account_id }
                                        onChange={ handleChange }
                                        fullWidth
                                    >
                                        {
                                            accountProp.accounts.map(({ id, name }) => (
                                                <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.to_account_id }</FormHelperText>
                                </FormControl> 
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <InputLabel>Description</InputLabel>
                                <TextField
                                    fullWidth
                                    error={ Boolean(error.description) }
                                    helperText={ error.description }
                                    variant='outlined'
                                    name="description"
                                    label="Enter Description"
                                    value={ bankAccountTransferState.description }
                                    onChange={ handleChange }
                                    multiline
                                    rows='3'
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.payment_method_id) } fullWidth>
                                    <InputLabel>Payment method</InputLabel>
                                    <Select
                                        variant='outlined'
                                        value={ bankAccountTransferState.payment_method_id }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'payment_method_id'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            paymentMethodProp.paymentMethods.map(({ id, name }) => (
                                                <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.payment_method_id }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Reference</InputLabel>
                                <TextField
                                    fullWidth
                                    name='reference'
                                    error={ Boolean(error.reference) }
                                    helperText={ error.reference }
                                    variant='outlined'
                                    label='Enter Reference'
                                    value={ bankAccountTransferState.reference }
                                    onChange={ handleChange }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <SaveCancelButtons 
                            isLoading={ isLoading }
                            cancelBtnCallback={ () => history.push(PATH.BANK_ACCOUNT_TRANSFER) }
                            saveBtnCallback={ onSubmitCreateTransfer }
                        />
                    </CardActions>
                </Card>
            
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    accountProp: selectAccount,
    bankAccountTransferProp: selectBankAccountTransfer,
    paymentMethodProp: selectPaymentMethod
});

export default connect(mapStateToProps, null)(CreateBankAccountTransfer)
