import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectExpenseCategory } from '../../../../redux/modules/expense-category/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as EXPENSE_CATEGORY from '../../../../redux/modules/expense-category/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** API */
import { findAsync } from '../../../../services/settings/expense.category'

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

const UpdateExpenseCategory = ({ alert, selectExpenseCategoryProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, expenseCategory, error } = selectExpenseCategoryProp;

    const [ expenseCategoryState, setExpenseCategoryState ] = useState(expenseCategory);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setExpenseCategoryState({ ...expenseCategoryState, enabled: checked })
            : setExpenseCategoryState({ ...expenseCategoryState, [name]: value });
    }

    const onLoadFetchExpenseCategoryById = async () => {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            setExpenseCategoryState(data);
        }
    }

    const onSubmitUpdateExpenseCategory = () => dispatch(EXPENSE_CATEGORY.updateExpenseCategory(expenseCategoryState));

    useEffect(() => {
        onLoadFetchExpenseCategoryById();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateExpenseCategory }>
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
                                    value={ expenseCategoryState.name }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Hex code</InputLabel>
                                <TextField
                                    fullWidth
                                    name='hex_code'
                                    error={ Boolean(error.hex_code) }
                                    helperText={ error.hex_code }
                                    label='Enter Colour'
                                    value={ expenseCategoryState.hex_code }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(expenseCategoryState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.EXPENSE_CATEGORY) }
                            saveBtnCallback={ onSubmitUpdateExpenseCategory }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    selectExpenseCategoryProp: selectExpenseCategory
});

export default connect(mapStateToProps, null)(UpdateExpenseCategory)
