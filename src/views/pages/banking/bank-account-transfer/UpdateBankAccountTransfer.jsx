import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { KeyboardDatePicker } from '@material-ui/pickers';

/** API */
import { findAsync } from './../../../../services/banking/bank.account.transfer';

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

const UpdateBankAccountTransfer = ({ alert, accountProp, bankAccountTransferProp, paymentMethodProp, match}) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, bankAccountTransfer, error } = bankAccountTransferProp;

    const [ bankAccountTransferState, setBankAccountTransferState ] = useState(bankAccountTransfer);
    
    const handleChange = (e) => 
    {
        const { name, value } = e.target;

        if (name !== 'from_account_id' && name !== 'amount') {
            setBankAccountTransferState({ ...bankAccountTransferState, [name]: value });
        }
    };

    const handleChangeDate = (date) => setBankAccountTransferState({ ...bankAccountTransferState, transferred_at: date });

    const onLoadFetchTransferById = async () => 
    {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            setBankAccountTransferState(data);
        }
    }

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onLoadFetchPaymentMethods = () => dispatch(PAYMENT_METHOD.getPaymentMethods());

    const onSubmitUpdateTransfer = (e) => {
        e.preventDefault();
        dispatch(BANK_ACCOUNT_TRANSFER.updateBankAccountTransfer(bankAccountTransferState));
    }

    useEffect(() => {
        onLoadFetchTransferById();
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
            <form onSubmit={ onSubmitUpdateTransfer }>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} alignItems='center'>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Date</InputLabel>
                                <KeyboardDatePicker
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
                                    value={ bankAccountTransferState.amount }
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <LocalAtmIcon />
                                          </InputAdornment>
                                        ),
                                    }}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.from_account_id) } fullWidth>
                                    <InputLabel>From Account</InputLabel>
                                    <Select
                                        name='from_account_id'
                                        variant='outlined'
                                        value={ bankAccountTransferState.from_account_id }
                                        fullWidth
                                        disabled
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
                                        fullWidth
                                        disabled
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
                                    value={ bankAccountTransferState.description || '' }
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
                                    value={ bankAccountTransferState.reference || '' }
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
                            saveBtnCallback={ onSubmitUpdateTransfer }
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

export default connect(mapStateToProps, null)(UpdateBankAccountTransfer)
