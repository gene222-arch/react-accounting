import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectChartOfAccountType } from './../../../../redux/modules/chart-of-account-type/selector';
import { selectAlert } from './../../../../redux/modules/alert/selector'

/** Actions */
import * as CHART_OF_ACCOUNT_TYPE from './../../../../redux/modules/chart-of-account-type/actions';
import * as ALERT from './../../../../redux/modules/alert/actions';


/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

/** Components */
import AlertPopUp from './../../../../components/AlertPopUp';
import SaveCancelButtons from './../../../../components/SaveCancelButtons';

import PATH from './../../../../routes/path';

const CHART_OF_ACCOUNT_CATEGORIES = [
    'Assets',
    'Liabilities',
    'Incomes',
    'Expenses',
    'Equity'
];

const CreateChartOfAccountType = ({ alert, chartOfAccountTypeProp }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const { isLoading, chartOfAccountType, error } = chartOfAccountTypeProp;

    const [ chartOfAccountTypeState, setChartOfAccountTypeState ] = useState(chartOfAccountType);

    const handleChange = (e) => setChartOfAccountTypeState({ ...chartOfAccountTypeState, [e.target.name]: e.target.value })

    const onSubmitCreateCOAType = () => dispatch(CHART_OF_ACCOUNT_TYPE.createChartOfAccountType(chartOfAccountTypeState));

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form noValidate onSubmit={ onSubmitCreateCOAType }>
                <Grid container spacing={1}>
                    <Grid item>
                        <FormControl error={ Boolean(error.category) }>
                        <InputLabel >Category</InputLabel>
                        <Select
                            value={ chartOfAccountTypeState.category }
                            onChange={ handleChange }
                            inputProps={{
                                name: 'category'
                            }}
                            fullWidth
                        >
                            {
                                CHART_OF_ACCOUNT_CATEGORIES.map((category, index) => (
                                    <MenuItem key={ index } value={ category }>{ category }</MenuItem>
                                ))
                            }
                        </Select>
                                <FormHelperText>{ error.category }</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            error={ Boolean(error.name) }
                            helperText={ error.name }
                            name='name'
                            label='Name'
                            value={chartOfAccountTypeState.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            error={ Boolean(error.description) }
                            helperText={ error.description }
                            name='description'
                            label='Description'
                            value={ chartOfAccountTypeState.description }
                            onChange={ handleChange }
                        />
                    </Grid>
                </Grid>
                <SaveCancelButtons 
                    isLoading={ isLoading }
                    cancelBtnCallback={ () => history.push(PATH.CHART_OF_ACCOUNT_TYPE) }
                    saveBtnCallback={ onSubmitCreateCOAType }
                />
            </form>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    chartOfAccountTypeProp: selectChartOfAccountType
});

export default connect(mapStateToProps, null)(CreateChartOfAccountType)