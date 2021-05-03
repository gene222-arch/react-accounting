import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectVendor } from '../../../../redux/modules/vendor/selector';
import { selectCurrency } from '../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as VENDOR from '../../../../redux/modules/vendor/actions';
import * as CURRENCY from '../../../../redux/modules/currency/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** API */
import { findAsync } from '../../../../services/purchases/vendor'

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

const UpdateVendor = ({ alert, currencyProp, vendorProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, vendor, error } = vendorProp;

    const [ vendorState, setVendorState ] = useState(vendor);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setVendorState({ ...vendorState, enabled: checked })
            : setVendorState({ ...vendorState, [name]: value });
    }

    const onLoadFetchVendorById = async () => {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            setVendorState(data);
        }
    }

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onSubmitUpdateVendor = () => dispatch(VENDOR.updateVendor(vendorState));

    useEffect(() => {
        onLoadFetchVendorById();
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
            <form onSubmit={ onSubmitUpdateVendor }>
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
                                    value={ vendorState.name }
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
                                    value={ vendorState.email }
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
                                    value={ vendorState.tax_number }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl error={ Boolean(error.currency_id) } fullWidth>
                                    <InputLabel>Currency</InputLabel>
                                    <Select
                                        value={ vendorState.currency_id }
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
                                    value={ vendorState.phone }
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
                                    value={ vendorState.website }
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
                                    value={ vendorState.address }
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
                                    value={ vendorState.address }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(vendorState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.CREATE_VENDOR) }
                            saveBtnCallback={ onSubmitUpdateVendor }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    currencyProp: selectCurrency,
    vendorProp: selectVendor
});

export default connect(mapStateToProps, null)(UpdateVendor)
