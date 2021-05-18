import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns'

/** Material UI Components */
import Grid from '@material-ui/core/Grid'

/** API */
import { findAsync } from '../../../../services/payroll/pay.calendar'

/** Actions */
import * as EXPENSE_CATEGORY from './../../../../redux/modules/expense-category/actions';
import * as ACCOUNT from './../../../../redux/modules/account/actions';
import * as EMPLOYEE from './../../../../redux/modules/employee/actions';
import * as PAYMENT_METHOD from './../../../../redux/modules/payment-method/actions';

/** Selectors */
import { selectExpenseCategory } from './../../../../redux/modules/expense-category/selector';
import { selectAccount } from './../../../../redux/modules/account/selector';
import { selectEmployee } from './../../../../redux/modules/employee/selector';
import { selectPaymentMethod } from './../../../../redux/modules/payment-method/selector';

/** Material UI Components */
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { Card, CardContent } from '@material-ui/core'
import { FormControl, FormHelperText, Select, MenuItem } from '@material-ui/core'

/** Components */
import MaterialTable from '../../../../components/MaterialTable'
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';

import PATH from './../../../../routes/path';

const EmployeeStep = ({ employeesState, expenseCategoryProp, accountProp, paymentMethodProp, runPayrollState, setRunPayrollState, handleChangeRunPayroll, error }) => 
{
    const dispatch = useDispatch();

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name', 
            render: ({ id, name }) => <StyledNavLink to={ PATH.VIEW_EMPLOYEE.replace(':id', id)} text={ name } />
        },
        { title: 'Position',  field: 'position' },
        { title: 'Salary',  field: 'salary' },
    ];

    const options = {
        selection: false,
        search: false
    };

    const handleChangeFromDate = (date) => setRunPayrollState({ ...runPayrollState, from_date: format(date, 'Y-m-d') });

    const handleChangeToDate = (date) => setRunPayrollState({ ...runPayrollState, to_date: format(date, 'Y-m-d') });
    
    const handleChangePaymentDate = (date) => setRunPayrollState({ ...runPayrollState, payment_date: format(date, 'Y-m-d') });

    const onLoadFetchExpenseCategories = () => dispatch(EXPENSE_CATEGORY.getExpenseCategories());

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onLoadFetchEmployees = () => dispatch(EMPLOYEE.getEmployees());

    const onLoadFetchPaymentMethods = () => dispatch(PAYMENT_METHOD.getPaymentMethods());

    useEffect(() => {
        onLoadFetchExpenseCategories();
        onLoadFetchAccounts();
        onLoadFetchEmployees();
        onLoadFetchPaymentMethods();
    }, []);  

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1} alignItems='center' justify='space-between'>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <InputLabel id='from_date'>From date</InputLabel>
                                    <KeyboardDatePicker
                                        error={ Boolean(error.from_date) }
                                        helperText={ error.from_date }
                                        id='from_date'
                                        name='from_date'
                                        variant='inline'
                                        format='yyyy-MM-dd'
                                        margin='normal'
                                        maxDate={ runPayrollState.to_date }
                                        value={ runPayrollState.from_date }
                                        onChange={ handleChangeFromDate }
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <InputLabel id='to_date'>To date</InputLabel>
                                    <KeyboardDatePicker
                                        error={ Boolean(error.to_date) }
                                        helperText={ error.to_date }
                                        name='to_date'
                                        variant='inline'
                                        format='yyyy-MM-dd'
                                        margin='normal'
                                        minDate={ runPayrollState.from_date }
                                        value={ runPayrollState.to_date }
                                        onChange={ handleChangeToDate }
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <InputLabel id='payment_date'>Payment date</InputLabel>
                                    <KeyboardDatePicker
                                        error={ Boolean(error.payment_date) }
                                        helperText={ error.payment_date }
                                        id='payment_date'
                                        name='payment_date'
                                        variant='inline'
                                        format='yyyy-MM-dd'
                                        margin='normal'
                                        value={ runPayrollState.payment_date }
                                        onChange={ handleChangePaymentDate }
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>           
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1} justify='space-between'>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <InputLabel id='name'>Name</InputLabel>
                                    <TextField
                                        error={ Boolean(error.name) }
                                        helperText={ error.name }
                                        id='name'
                                        name='name'
                                        value={ runPayrollState.name }
                                        onChange={ handleChangeRunPayroll }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.expense_category_id) } fullWidth>
                                        <InputLabel id='expense_category_id'>Category</InputLabel>
                                        <Select
                                            id='expense_category_id'
                                            name='expense_category_id'
                                            value={ runPayrollState.expense_category_id }
                                            onChange={ handleChangeRunPayroll }
                                            fullWidth
                                            label='Select Category'
                                        >
                                            {
                                                expenseCategoryProp.expenseCategories.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{ error.expense_category_id }</FormHelperText>
                                    </FormControl>  
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.account_id) } fullWidth>
                                        <InputLabel id='account_id'>Account</InputLabel>
                                        <Select
                                            id='account_id'
                                            name='account_id'
                                            value={ runPayrollState.account_id }
                                            onChange={ handleChangeRunPayroll }
                                            fullWidth
                                            label='Select Account'
                                        >
                                            {
                                                accountProp.accounts.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{ error.expense_category_id }</FormHelperText>
                                    </FormControl>  
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.payment_method_id) } fullWidth>
                                        <InputLabel id='payment_method_id'>Payment Method</InputLabel>
                                        <Select
                                            id='payment_method_id'
                                            name='payment_method_id'
                                            value={ runPayrollState.payment_method_id }
                                            onChange={ handleChangeRunPayroll }
                                            fullWidth
                                            label='Select Payment Method'
                                        >
                                            {
                                                paymentMethodProp.paymentMethods.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{ error.expense_category_id }</FormHelperText>
                                    </FormControl>  
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }
                        data={ employeesState }
                        title='Employees'
                        options={ options }
                    /> 
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    expenseCategoryProp: selectExpenseCategory,
    accountProp: selectAccount,
    paymentMethodProp: selectPaymentMethod
});

export default connect(mapStateToProps, null)(EmployeeStep)
