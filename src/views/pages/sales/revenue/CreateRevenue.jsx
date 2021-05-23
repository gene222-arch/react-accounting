import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns'

/** Selectors */
import { selectRevenue } from '../../../../redux/modules/revenue/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectAccount } from './../../../../redux/modules/account/selector';
import { selectCustomer } from './../../../../redux/modules/customer/selector';
import { selectIncomeCategory } from './../../../../redux/modules/income-category/selector';
import { selectPaymentMethod } from './../../../../redux/modules/payment-method/selector';

/** Actions */
import * as REVENUE from '../../../../redux/modules/revenue/actions';
import * as ACCOUNT from './../../../../redux/modules/account/actions';
import * as CUSTOMER from './../../../../redux/modules/customer/actions';
import * as INCOME_CATEGORY from './../../../../redux/modules/income-category/actions';
import * as PAYMENT_METHOD from './../../../../redux/modules/payment-method/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { FormControlLabel, FormControl, FormHelperText } from '@material-ui/core'
import { Card, CardContent, CardActions } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
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
import { selectDefaultSettings } from './../../../../redux/modules/default-settings/selector';


const RECURRING_LIST = [
    'No',
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly'
];

const CreateRevenue = ({ 
    alert, 
    defaultSettingsProp,
    accountProp,
    customerProp,
    incomeCategoryProp,
    paymentMethodProp,
    revenueProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, revenue, error } = revenueProp;

    const REVENUE_DEFAULT_PROPS = {
        ...revenue,
        account_id: defaultSettingsProp.defaultSettings.account_id,
        income_category_id: defaultSettingsProp.defaultSettings.income_category_id,
        payment_method_id: defaultSettingsProp.defaultSettings.payment_method_id
    };

    const [ revenueState, setRevenueState ] = useState(REVENUE_DEFAULT_PROPS);

    const handleChange = (e) => setRevenueState({ ...revenueState, [e.target.name]: e.target.value });

    const handleChangeDate = (date) => setRevenueState({ ...revenueState, date: format(date, 'Y-m-d') });

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onLoadFetchCustomers = () => dispatch(CUSTOMER.getCustomers());

    const onLoadFetchIncomeCategories = () => dispatch(INCOME_CATEGORY.getIncomeCategories());

    const onLoadFetchPaymentMethods = () => dispatch(PAYMENT_METHOD.getPaymentMethods());

    const onSubmitCreateRevenue = (e) => {
        e.preventDefault();

        const { currency_id } = accountProp.accounts.find(({ id }) => revenueState.account_id === id);

        dispatch(REVENUE.createRevenue({
            ...revenueState,
            currency_id
        }));
    }

    useEffect(() => {
        onLoadFetchAccounts();
        onLoadFetchCustomers();
        onLoadFetchIncomeCategories();
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
            <form onSubmit={ onSubmitCreateRevenue }>
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
                                    value={ revenueState.date }
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
                                    value={ revenueState.amount }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.account_id) } fullWidth>
                                    <InputLabel>Account</InputLabel>
                                    <Select
                                        value={ revenueState.account_id }
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
                                <FormControl error={ Boolean(error.customer_id) } fullWidth>
                                    <InputLabel>Customer</InputLabel>
                                    <Select
                                        value={ revenueState.customer_id }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'customer_id'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            customerProp.customers.map(({ id, name }) => (
                                                <MenuItem key={ id } value={ id }>
                                                    { name }
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.customer_id || '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    error={ Boolean(error.description) }
                                    helperText={ error.description }
                                    name="description"
                                    label="Enter Description"
                                    value={ revenueState.description }
                                    onChange={ handleChange }
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.income_category_id) } fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={ revenueState.income_category_id }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'income_category_id'
                                        }}
                                        fullWidth
                                    >
                                        {
                                            incomeCategoryProp.incomeCategories.map(({ id, name }) => (
                                                <MenuItem key={ id } value={ id }>
                                                    { name }
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.income_category_id || '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.recurring) } fullWidth>
                                    <InputLabel>Recurring</InputLabel>
                                    <Select
                                        value={ revenueState.recurring }
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
                                        value={ revenueState.payment_method_id }
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
                                    value={ revenueState.reference }
                                    onChange={ handleChange }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <SaveCancelButtons 
                            isLoading={ isLoading }
                            cancelBtnCallback={ () => history.push(PATH.REVENUE) }
                            saveBtnCallback={ onSubmitCreateRevenue }
                        />
                    </CardActions>
                </Card>
            
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    defaultSettingsProp: selectDefaultSettings,
    accountProp: selectAccount,
    customerProp: selectCustomer,
    incomeCategoryProp: selectIncomeCategory,
    paymentMethodProp: selectPaymentMethod,
    revenueProp: selectRevenue
});

export default connect(mapStateToProps, null)(CreateRevenue)
