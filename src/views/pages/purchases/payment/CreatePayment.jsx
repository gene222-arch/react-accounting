import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { KeyboardDatePicker } from '@material-ui/pickers';

/** Selectors */
import { selectPayment } from '../../../../redux/modules/payment/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectAccount } from '../../../../redux/modules/account/selector';
import { selectVendor } from '../../../../redux/modules/vendor/selector';
import { selectExpenseCategory } from '../../../../redux/modules/expense-category/selector';
import { selectPaymentMethod } from '../../../../redux/modules/payment-method/selector';

/** Actions */
import * as PAYMENT from '../../../../redux/modules/payment/actions';
import * as ACCOUNT from '../../../../redux/modules/account/actions';
import * as VENDOR from '../../../../redux/modules/vendor/actions';
import * as EXPENSE_CATEGORY from '../../../../redux/modules/expense-category/actions';
import * as PAYMENT_METHOD from '../../../../redux/modules/payment-method/actions';
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

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';


const RECURRING_LIST = [
    'No',
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly'
];

const CreatePayment = ({ 
    alert, 
    accountProp,
    vendorProp,
    expenseCategoryProp,
    paymentMethodProp,
    paymentProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, payment, error } = paymentProp;

    const [ paymentState, setPaymentState ] = useState(payment);

    const handleChange = (e) => setPaymentState({ ...paymentState, [e.target.name]: e.target.value });

    const handleChangeDate = (date) => setPaymentState({ ...paymentState, date });

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onLoadFetchVendors = () => dispatch(VENDOR.getVendors());

    const onLoadFetchExpenseCategories = () => dispatch(EXPENSE_CATEGORY.getExpenseCategories());

    const onLoadFetchPaymentMethods = () => dispatch(PAYMENT_METHOD.getPaymentMethods());

    const onSubmitCreatePayment = (e) => {
        e.preventDefault();

        const { currency_id } = accountProp.accounts.find(({ id }) => paymentState.account_id === id);
        
        dispatch(PAYMENT.createPayment({
            ...paymentState,
            currency_id
        }));
    }

    useEffect(() => {
        onLoadFetchAccounts();
        onLoadFetchVendors();
        onLoadFetchExpenseCategories();
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
            <form onSubmit={ onSubmitCreatePayment }>
                <Card>
                    <CardContent>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Date</InputLabel>
                                <KeyboardDatePicker
                                    name='dateFrom'
                                    variant='inline'
                                    format='yyyy-MM-dd'
                                    margin='normal'
                                    value={ paymentState.date }
                                    onChange={ handleChangeDate }
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Amount</InputLabel>
                                <TextField
                                    fullWidth
                                    name='amount'
                                    error={ Boolean(error.amount) }
                                    helperText={ error.amount }
                                    value={ paymentState.amount }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.account_id) } fullWidth>
                                    <InputLabel>Account</InputLabel>
                                    <Select
                                        value={ paymentState.account_id }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'account_id'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            accountProp.accounts.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                        }
                                    </Select>
                                    <FormHelperText>{ error.account_id || '' }</FormHelperText>
                                </FormControl> 
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.vendor_id) } fullWidth>
                                    <InputLabel>Vendor</InputLabel>
                                    <Select
                                        value={ paymentState.vendor_id }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'vendor_id'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            vendorProp.vendors.map(({ id, name }) => (
                                                <MenuItem key={ id } value={ id }>
                                                    { name }
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.vendor_id || '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    error={ Boolean(error.description) }
                                    helperText={ error.description }
                                    name="description"
                                    label="Enter Description"
                                    value={ paymentState.description }
                                    onChange={ handleChange }
                                    multiline
                                    rows={ 3 }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.expense_category_id) } fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={ paymentState.expense_category_id }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'expense_category_id'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            expenseCategoryProp.expenseCategories.map(({ id, name }) => (
                                                <MenuItem key={ id } value={ id }>
                                                    { name }
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.expense_category_id || '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.recurring) } fullWidth>
                                    <InputLabel>Recurring</InputLabel>
                                    <Select
                                        value={ paymentState.recurring }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'recurring'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            RECURRING_LIST.map((recurring, index) => (
                                                <MenuItem key={ index } value={ recurring }>
                                                    { recurring }
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.recurring || '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.payment_method_id) } fullWidth>
                                    <InputLabel>Payment method</InputLabel>
                                    <Select
                                        value={ paymentState.payment_method_id }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'payment_method_id'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            paymentMethodProp.paymentMethods.map(({ id, name }) => (
                                                <MenuItem key={ id } value={ id }>
                                                    { name }
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.payment_method_id || '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Reference</InputLabel>
                                <TextField
                                    fullWidth
                                    name='reference'
                                    error={ Boolean(error.reference) }
                                    helperText={ error.reference }
                                    label='Enter Reference'
                                    value={ paymentState.reference }
                                    onChange={ handleChange }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <SaveCancelButtons 
                            isLoading={ isLoading }
                            cancelBtnCallback={ () => history.push(PATH.PAYMENT) }
                            saveBtnCallback={ onSubmitCreatePayment }
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
    vendorProp: selectVendor,
    expenseCategoryProp: selectExpenseCategory,
    paymentMethodProp: selectPaymentMethod,
    paymentProp: selectPayment
});

export default connect(mapStateToProps, null)(CreatePayment)
