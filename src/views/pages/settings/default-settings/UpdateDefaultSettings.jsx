import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { findAsync } from './../../../../services/settings/default.settings';

/** Selectors */
import { selectDefaultSettings } from './../../../../redux/modules/default-settings/selector';
import { selectAccount } from './../../../../redux/modules/account/selector';
import { selectCurrency } from './../../../../redux/modules/currency/selector';
import { selectIncomeCategory } from './../../../../redux/modules/income-category/selector';
import { selectExpenseCategory } from './../../../../redux/modules/expense-category/selector';
import { selectTax } from './../../../../redux/modules/tax/selector';
import { selectPaymentMethod } from './../../../../redux/modules/payment-method/selector';

/** Actions */
import * as DEFAULT_SETTINGS from './../../../../redux/modules/default-settings/actions';
import * as ACCOUNT from './../../../../redux/modules/account/actions';
import * as CURRENCY from './../../../../redux/modules/currency/actions';
import * as INCOME_CATEGORY from './../../../../redux/modules/income-category/actions';
import * as EXPENSE_CATEGORY from './../../../../redux/modules/expense-category/actions';
import * as TAX from './../../../../redux/modules/tax/actions';
import * as PAYMENT_METHOD from './../../../../redux/modules/payment-method/actions';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, CardActions } from '@material-ui/core'
import { FormControl, FormHelperText, Select, MenuItem, InputLabel, Container } from '@material-ui/core'
import SaveCancelButtons from './../../../../components/SaveCancelButtons';

import PATH from './../../../../routes/path';


const UpdateDefaultSettings = ({ accountProp, currencyProp, incomeCategoryProp, expenseCategoryProp, taxProp, paymentMethodProp, defaultSettingsProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, defaultSettings, error } = defaultSettingsProp;

    const [ defaultSettingsState, setDefaultSettingsState ] = useState(defaultSettings);

    const handleChange = (e) => setDefaultSettingsState({ ...defaultSettingsState, [e.target.name]: e.target.value });

    const onSubmitUpdateDefaultSettings = () => dispatch(DEFAULT_SETTINGS.updateDefaultSettings(defaultSettingsState));

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onLoadFetchIncomeCategories = () => dispatch(INCOME_CATEGORY.getIncomeCategories());

    const onLoadFetchExpenseCategories = () => dispatch(EXPENSE_CATEGORY.getExpenseCategories());

    const onLoadFetchTaxes = () => dispatch(TAX.getTaxes());

    const onLoadFetchPaymentMethods = () => dispatch(PAYMENT_METHOD.getPaymentMethods());

    useEffect(() => {
        onLoadFetchAccounts();
        onLoadFetchCurrencies();
        onLoadFetchIncomeCategories();
        onLoadFetchExpenseCategories();
        onLoadFetchTaxes();
        onLoadFetchPaymentMethods();
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.account_id) } fullWidth>
                                        <InputLabel id='account_id'>Account</InputLabel>
                                        <Select
                                            id='account_id'
                                            name='account_id'
                                            onChange={ handleChange }
                                            value={ defaultSettingsState.account_id }
                                        >
                                            {
                                                accountProp.accounts.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>
                                                        { name } 
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.currency_id) } fullWidth>
                                        <InputLabel id='currency_id'>Currency</InputLabel>
                                        <Select
                                            id='currency_id'
                                            name='currency_id'
                                            onChange={ handleChange }
                                            value={ defaultSettingsState.currency_id }
                                        >
                                            {
                                                currencyProp.currencies.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>
                                                        { name } 
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.income_category_id) } fullWidth>
                                        <InputLabel id='income_category_id'>Income Category</InputLabel>
                                        <Select
                                            id='income_category_id'
                                            name='income_category_id'
                                            onChange={ handleChange }
                                            value={ defaultSettingsState.income_category_id }
                                        >
                                            {
                                                incomeCategoryProp.incomeCategories.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>
                                                        { name } 
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.expense_category_id) } fullWidth>
                                        <InputLabel id='expense_category_id'>Expense Category</InputLabel>
                                        <Select
                                            id='expense_category_id'
                                            name='expense_category_id'
                                            onChange={ handleChange }
                                            value={ defaultSettingsState.expense_category_id }
                                        >
                                            {
                                                expenseCategoryProp.expenseCategories.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>
                                                        { name } 
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.payment_method_id) } fullWidth>
                                        <InputLabel id='payment_method_id'>Payment Method</InputLabel>
                                        <Select
                                            id='payment_method_id'
                                            name='payment_method_id'
                                            onChange={ handleChange }
                                            value={ defaultSettingsState.payment_method_id }
                                        >
                                            {
                                                paymentMethodProp.paymentMethods.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>
                                                        { name } 
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.tax_id) } fullWidth>
                                        <InputLabel id='tax_id'>Tax</InputLabel>
                                        <Select
                                            id='tax_id'
                                            name='tax_id'
                                            onChange={ handleChange }
                                            value={ defaultSettingsState.tax_id }
                                        >
                                            {
                                                taxProp.taxes.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>
                                                        { name } 
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>     
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <SaveCancelButtons 
                        isLoading={ isLoading }
                        cancelBtnCallback={ () => history.goBack() }
                        saveBtnCallback={ onSubmitUpdateDefaultSettings }
                    />
                </Grid>
            </Grid>   
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    defaultSettingsProp: selectDefaultSettings,
    accountProp: selectAccount,
    currencyProp: selectCurrency,
    incomeCategoryProp: selectIncomeCategory,
    expenseCategoryProp: selectExpenseCategory,
    taxProp: selectTax,
    paymentMethodProp: selectPaymentMethod,
});

export default connect(mapStateToProps, null)(UpdateDefaultSettings)
