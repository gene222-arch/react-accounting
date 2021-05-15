import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectSalaryBenefit } from '../../../../redux/modules/salary-benefit/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as SALARY_BENEFIT from '../../../../redux/modules/salary-benefit/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { FormControlLabel } from '@material-ui/core'
import { Card, CardContent, CardActions } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';

const CreateSalaryBenefit = ({ alert, salaryBenefitProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, salaryBenefit, error } = salaryBenefitProp;

    const [ salaryBenefitState, setSalaryBenefitState ] = useState(salaryBenefit);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setSalaryBenefitState({ ...salaryBenefitState, enabled: checked })
            : setSalaryBenefitState({ ...salaryBenefitState, [name]: value });
    }

    const onSubmitCreateSalaryBenefit = () => dispatch(SALARY_BENEFIT.createSalaryBenefit(salaryBenefitState));

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitCreateSalaryBenefit }>
                <Card>
                    <CardContent>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Type</InputLabel>
                                <TextField
                                    fullWidth
                                    name='type'
                                    error={ Boolean(error.type) }
                                    helperText={ error.type }
                                    label='Enter Type'
                                    value={ salaryBenefitState.type }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Amount</InputLabel>
                                <TextField
                                    fullWidth
                                    name='amount'
                                    error={ Boolean(error.amount) }
                                    helperText={ error.amount }
                                    label='Enter Amount'
                                    value={ salaryBenefitState.amount }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(salaryBenefitState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.SALARY_BENEFIT) }
                            saveBtnCallback={ onSubmitCreateSalaryBenefit }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    salaryBenefitProp: selectSalaryBenefit
});

export default connect(mapStateToProps, null)(CreateSalaryBenefit)
