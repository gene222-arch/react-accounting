import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectChartOfAccountType } from '../../../../redux/modules/chart-of-account-type/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector'

/** Actions */
import * as CHART_OF_ACCOUNT_TYPE from '../../../../redux/modules/chart-of-account-type/actions';
import * as ALERT from '../../../../redux/modules/alert/actions';

/** API */
import { findAsync } from '../../../../services/double-entry/chart.of.account.type';

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

const UpdateChartOfAccountType = ({ alert, chartOfAccountTypeProp, match }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const { isLoading: isUpdating, chartOfAccountType, error } = chartOfAccountTypeProp;
    const id = match.params.id;

    const [ isLoading, setIsLoading ] = useState(true);
    const [ chartOfAccountTypeState, setChartOfAccountTypeState ] = useState(chartOfAccountType);

    const handleChange = (e) => setChartOfAccountTypeState({ ...chartOfAccountTypeState, [e.target.name]: e.target.value });

    const onLoadFetchById = async () => 
    {
        try {
            const { message, status, data } = await findAsync({ id });

            setChartOfAccountTypeState(data);

        } catch ({ message }) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'Data not found'
            }));
        }

        setIsLoading(false);
    }

    const onSubmitUpdateCOAType = () => dispatch(CHART_OF_ACCOUNT_TYPE.updateChartOfAccountType(chartOfAccountTypeState));

    useEffect(() => {
        onLoadFetchById();
    }, []);

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            {
                !isLoading && (
                    <form noValidate onSubmit={ onSubmitUpdateCOAType }>
                        <Grid container spacing={1}>
                            <Grid item>
                                <FormControl error={ Boolean(error.category) }>
                                <InputLabel>Category</InputLabel>
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
                                    value={ chartOfAccountTypeState.name }
                                    onChange={ handleChange }
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
                            isLoading={ isUpdating }
                            cancelBtnCallback={ () => history.push(PATH.CHART_OF_ACCOUNT_TYPE) }
                            saveBtnCallback={ onSubmitUpdateCOAType }
                        />
                    </form>
                )
            }
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    chartOfAccountTypeProp: selectChartOfAccountType
});

export default connect(mapStateToProps, null)(UpdateChartOfAccountType)