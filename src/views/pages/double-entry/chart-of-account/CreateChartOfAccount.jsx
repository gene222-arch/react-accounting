import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

/** Selectors */
import { selectChartOfAccount } from './../../../../redux/modules/chart-of-account/selector';
import { selectChartOfAccountType } from './../../../../redux/modules/chart-of-account-type/selector';
import { selectAlert } from './../../../../redux/modules/alert/selector'

/** Actions */
import * as CHART_OF_ACCOUNT from './../../../../redux/modules/chart-of-account/actions';
import * as CHART_OF_ACCOUNT_TYPE from './../../../../redux/modules/chart-of-account-type/actions';
import * as ALERT from './../../../../redux/modules/alert/actions';

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

/** Components */
import AlertPopUp from './../../../../components/AlertPopUp';
import SaveCancelButtons from './../../../../components/SaveCancelButtons';

import PATH from './../../../../routes/path';


const CreateChartOfAccount = ({ alert, chartOfAccountProp, chartOfAccountTypeProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, chartOfAccount, error } = chartOfAccountProp;

    const [ chartOfAccountState, setChartOfAccountState ] = useState(chartOfAccount);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setChartOfAccountState({ ...chartOfAccountState, enabled: checked })
            : setChartOfAccountState({ ...chartOfAccountState, [name]: value });
    }

    const onSubmitCreateCOA = () => dispatch(CHART_OF_ACCOUNT.createChartOfAccount(chartOfAccountState));

    useEffect(() => {
        dispatch(CHART_OF_ACCOUNT_TYPE.getChartOfAccountTypes());
    }, []);

    return !chartOfAccountTypeProp.isLoading && (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form noValidate onSubmit={ onSubmitCreateCOA }>
                <Grid container spacing={1}>
                    <Grid item>
                        <TextField
                            error={ Boolean(error.name) }
                            helperText={ error.name }
                            name='name'
                            label='Name'
                            value={chartOfAccountState.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            error={ Boolean(error.code) }
                            helperText={ error.code }
                            name='code'
                            label='Code'
                            value={ chartOfAccountState.code }
                            onChange={ handleChange }
                        />
                    </Grid>
                    <Grid item>
                        <FormControl error={ Boolean(error.chart_of_account_type_id) }>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={ chartOfAccountState.chart_of_account_type_id }
                            onChange={ handleChange }
                            inputProps={{
                                name: 'chart_of_account_type_id'
                            }}
                            fullWidth
                        >
                            {
                                chartOfAccountTypeProp.chartOfAccountTypes.map(chartOfAccountType => (
                                    <MenuItem 
                                        key={ chartOfAccountType.id } 
                                        value={ chartOfAccountType.id }
                                    >
                                        { chartOfAccountType.name }
                                    </MenuItem>
                                ))
                            }
                        </Select>
                                <FormHelperText>{ error.chart_of_account_type_id || '' }</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            error={ Boolean(error.description) }
                            helperText={ error.description }
                            name='description'
                            label='Description'
                            value={ chartOfAccountState.description }
                            onChange={ handleChange }
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={ Boolean(chartOfAccountState.enabled) } 
                                    onChange={ handleChange } 
                                    name="enabled" 
                                />}
                            label="Enabled"
                        />
                    </Grid>
                </Grid>
                <SaveCancelButtons 
                    isLoading={ isLoading }
                    cancelBtnCallback={ () => history.push(PATH.CHART_OF_ACCOUNT) }
                    saveBtnCallback={ onSubmitCreateCOA }
                />
            </form>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    chartOfAccountProp: selectChartOfAccount,
    chartOfAccountTypeProp: selectChartOfAccountType
});

export default connect(mapStateToProps, null)(CreateChartOfAccount)