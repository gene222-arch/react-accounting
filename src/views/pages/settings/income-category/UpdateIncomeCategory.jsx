import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectIncomeCategory } from '../../../../redux/modules/income-category/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as INCOME_CATEGORY from '../../../../redux/modules/income-category/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** API */
import { findAsync } from '../../../../services/settings/income.category'

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

const UpdateIncomeCategory = ({ alert, selectIncomeCategoryProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, incomeCategory, error } = selectIncomeCategoryProp;

    const [ incomeCategoryState, setIncomeCategoryState ] = useState(incomeCategory);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setIncomeCategoryState({ ...incomeCategoryState, enabled: checked })
            : setIncomeCategoryState({ ...incomeCategoryState, [name]: value });
    }

    const onLoadFetchIncomeCategoryById = async () => {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            setIncomeCategoryState(data);
        }
    }

    const onSubmitUpdateIncomeCategory = () => dispatch(INCOME_CATEGORY.updateIncomeCategory(incomeCategoryState));

    useEffect(() => {
        onLoadFetchIncomeCategoryById();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateIncomeCategory }>
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
                                    value={ incomeCategoryState.name }
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
                                    value={ incomeCategoryState.hex_code }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(incomeCategoryState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.INCOME_CATEGORY) }
                            saveBtnCallback={ onSubmitUpdateIncomeCategory }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    selectIncomeCategoryProp: selectIncomeCategory
});

export default connect(mapStateToProps, null)(UpdateIncomeCategory)
