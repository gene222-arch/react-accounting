import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectCurrency } from '../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** API */
import { findAsync } from '../../../../services/settings/currency';

/** Actions */
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

const UpdateTax = ({ alert, currencyProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const id = match.params.id;

    const { isLoading, currency, error } = currencyProp;

    const [ currencyState, setCurrencyState ] = useState(currency);

    const onLoadFetchCurrencyById = async () => 
    {
        try {
            const { data, status, message } = await findAsync({ id });

            if (status !== 'success') {
    
            }
    
            if (status === 'success') {
                setCurrencyState(data);
            }

        } catch ({ message }) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message
            }));
        }
    }

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setCurrencyState({ ...currencyState, enabled: checked })
            : setCurrencyState({ ...currencyState, [name]: value });
    }

    const onSubmitUpdateCurrency = (e) => dispatch(CURRENCY.updateCurrency(currencyState));

    useEffect(() => {
        onLoadFetchCurrencyById();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateCurrency }>
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
                                    value={ currencyState.name }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Rate</InputLabel>
                                <TextField
                                    fullWidth
                                    name='rate'
                                    error={ Boolean(error.rate) }
                                    helperText={ error.rate }
                                    label='Enter Rate'
                                    value={ currencyState.rate }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Code</InputLabel>
                                <TextField
                                    fullWidth
                                    name='code'
                                    error={ Boolean(error.code) }
                                    helperText={ error.code }
                                    label='Enter Code'
                                    value={ currencyState.code }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(currencyState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.CURRENCY) }
                            saveBtnCallback={ onSubmitUpdateCurrency }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    currencyProp: selectCurrency
});

export default connect(mapStateToProps, null)(UpdateTax)
