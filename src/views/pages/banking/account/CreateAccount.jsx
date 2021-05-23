import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectAccount } from '../../../../redux/modules/account/selector';
import { selectCurrency } from '../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectDefaultSettings } from './../../../../redux/modules/default-settings/selector';

/** Actions */
import * as ACCOUNT from '../../../../redux/modules/account/actions';
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


const CreateAccount = ({ alert, defaultSettingsProp, currencyProp, accountProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, account, error } = accountProp;

    const DEFAULT_ACCOUNT_PROPS = {
        ...account,
        currency_id: defaultSettingsProp.defaultSettings.currency_id
    };

    const [ accountState, setAccountState ] = useState(DEFAULT_ACCOUNT_PROPS);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setAccountState({ ...accountState, enabled: checked })
            : setAccountState({ ...accountState, [name]: value });
    }

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onSubmitCreateAccount = () => dispatch(ACCOUNT.createAccount({
        ...accountState,
        balance: accountState.opening_balance,
    }))

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
            <form onSubmit={ onSubmitCreateAccount }>
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
                                    value={ accountState.name }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Number</InputLabel>
                                <TextField
                                    fullWidth
                                    name='number'
                                    error={ Boolean(error.number) }
                                    helperText={ error.number }
                                    label='Enter Number'
                                    value={ accountState.number }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.currency_id) } fullWidth>
                                    <InputLabel>Currency</InputLabel>
                                    <Select
                                        value={ accountState.currency_id }
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
                                <InputLabel>Opening balance</InputLabel>
                                <TextField
                                    fullWidth
                                    name='opening_balance'
                                    error={ Boolean(error.opening_balance) }
                                    helperText={ error.opening_balance }
                                    label='Enter Rate'
                                    value={ accountState.opening_balance }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Bank name</InputLabel>
                                <TextField
                                    fullWidth
                                    name='bank_name'
                                    error={ Boolean(error.bank_name) }
                                    helperText={ error.bank_name }
                                    label='Enter Bank Name'
                                    value={ accountState.bank_name }
                                    onChange={ handleChange }
                                />
                            </Grid>  
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Bank Phone</InputLabel>
                                <TextField
                                    fullWidth
                                    name='bank_phone'
                                    error={ Boolean(error.bank_phone) }
                                    helperText={ error.bank_phone }
                                    label='Enter Bank Phone'
                                    value={ accountState.bank_phone }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Bank Address</InputLabel>
                                <TextField
                                    fullWidth
                                    name='bank_address'
                                    error={ Boolean(error.bank_address) }
                                    helperText={ error.bank_address }
                                    label='Enter Bank Address'
                                    value={ accountState.bank_address }
                                    onChange={ handleChange }
                                    multiline
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(accountState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.ACCOUNT) }
                            saveBtnCallback={ onSubmitCreateAccount }
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
    accountProp: selectAccount
});

export default connect(mapStateToProps, null)(CreateAccount)
