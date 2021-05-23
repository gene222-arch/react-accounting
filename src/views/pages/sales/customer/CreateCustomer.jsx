import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectCustomer } from '../../../../redux/modules/customer/selector';
import { selectCurrency } from '../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectDefaultSettings } from './../../../../redux/modules/default-settings/selector';

/** Actions */
import * as CUSTOMER from '../../../../redux/modules/customer/actions';
import * as CURRENCY from '../../../../redux/modules/currency/actions';
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

const CreateCustomer = ({ alert, defaultSettingsProp, currencyProp, customerProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, customer, error } = customerProp;

    const CUSTOMER_DEFAULT_PROPS = {
        ...customer,
        currency_id: defaultSettingsProp.defaultSettings.currency_id,
    };

    const [ customerState, setCustomerState ] = useState(CUSTOMER_DEFAULT_PROPS);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setCustomerState({ ...customerState, enabled: checked })
            : setCustomerState({ ...customerState, [name]: value });
    }

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onSubmitCreateCustomer = (e) => {
        e.preventDefault();
        dispatch(CUSTOMER.createCustomer(customerState));
    }

    useEffect(() => {
        onLoadFetchCurrencies();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitCreateCustomer }>
                <Card>
                    <CardContent>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Name</InputLabel>
                                <TextField
                                    fullWidth
                                    name='name'
                                    error={ Boolean(error.name) }
                                    helperText={ error.name }
                                    label='Enter Name'
                                    value={ customerState.name }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Email</InputLabel>
                                <TextField
                                    fullWidth
                                    name='email'
                                    error={ Boolean(error.email) }
                                    helperText={ error.email }
                                    label='Enter Rate'
                                    value={ customerState.email }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Tax number</InputLabel>
                                <TextField
                                    fullWidth
                                    name='tax_number'
                                    error={ Boolean(error.tax_number) }
                                    helperText={ error.tax_number }
                                    label='Enter Tax number'
                                    value={ customerState.tax_number }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.currency_id) } fullWidth>
                                    <InputLabel>Currency</InputLabel>
                                    <Select
                                        value={ customerState.currency_id }
                                        onChange={ handleChange }
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
                                <InputLabel>Phone</InputLabel>
                                <TextField
                                    fullWidth
                                    name='phone'
                                    error={ Boolean(error.phone) }
                                    helperText={ error.phone }
                                    label='Enter Currency'
                                    value={ customerState.phone }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Website</InputLabel>
                                <TextField
                                    fullWidth
                                    name='website'
                                    error={ Boolean(error.website) }
                                    helperText={ error.website }
                                    label='Enter Website'
                                    value={ customerState.website }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Address</InputLabel>
                                <TextField
                                    fullWidth
                                    name='address'
                                    error={ Boolean(error.address) }
                                    helperText={ error.address }
                                    label='Enter Address'
                                    value={ customerState.address }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Reference</InputLabel>
                                <TextField
                                    fullWidth
                                    name='reference'
                                    error={ Boolean(error.reference) }
                                    helperText={ error.reference }
                                    label='Enter Reference'
                                    value={ customerState.address }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(customerState.enabled) } 
                                            onChange={ handleChange } 
                                            name="enabled" 
                                        />}
                                    label="Enabled"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <SaveCancelButtons 
                            isLoading={ isLoading }
                            cancelBtnCallback={ () => history.push(PATH.CUSTOMER) }
                            saveBtnCallback={ onSubmitCreateCustomer }
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
    currencyProp: selectCurrency,
    customerProp: selectCustomer
});

export default connect(mapStateToProps, null)(CreateCustomer)
