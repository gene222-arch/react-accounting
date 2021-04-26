import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectTax } from '../../../../redux/modules/tax/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as TAX from '../../../../redux/modules/tax/actions';
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

/** API */
import { findAsync } from '../../../../services/settings/tax';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from './../../../../components/SaveCancelButtons';
import AlertPopUp from './../../../../components/AlertPopUp';

import PATH from './../../../../routes/path';



const TAX_TYPES = [
    'Compound',
    'Fixed',
    'Inclusive',
    'Normal',
    'Withholding'
];

const UpdateTax = ({ alert, taxProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const id = match.params.id;

    const { isLoading, tax, error } = taxProp;

    const [ taxState, setTaxState ] = useState(tax);

    const onLoadFetchTaxById = async () => 
    {
        const { data, status, message } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            setTaxState(data);
        }
    }

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setTaxState({ ...taxState, enabled: checked })
            : setTaxState({ ...taxState, [name]: value });
    }

    const onSubmitUpdateTax = () => dispatch(TAX.updateTax(taxState));

    useEffect(() => {
        onLoadFetchTaxById();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateTax }>
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
                                    value={ taxState.name }
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
                                    value={ taxState.rate }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl 
                                    error={ Boolean(error.type) } 
                                    fullWidth
                                >
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={ taxState.type }
                                        onChange={ handleChange }
                                        inputProps={{
                                            name: 'type'
                                        }}
                                    >
                                        {
                                            TAX_TYPES.map((type, index) => (
                                                <MenuItem 
                                                    key={ index } 
                                                    value={ type }
                                                >
                                                    { type.toLowerCase() !== 'normal' ? type : <b>{ type }</b> }
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{ error.type || '' }</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(taxState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.TAX) }
                            saveBtnCallback={ onSubmitUpdateTax }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    taxProp: selectTax
});

export default connect(mapStateToProps, null)(UpdateTax)
