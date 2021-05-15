import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectContribution } from '../../../../redux/modules/contribution/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** API */
import { findAsync } from '../../../../services/settings/contribution';

/** Actions */
import * as CONTRIBUTION from '../../../../redux/modules/contribution/actions';
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

const UpdateContribution = ({ alert, contributionProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, contribution, error } = contributionProp;

    const [ contributionState, setContributionState ] = useState(contribution);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setContributionState({ ...contributionState, enabled: checked })
            : setContributionState({ ...contributionState, [name]: value });
    }

    const onLoadFetchContributionById = async () => 
    {
        try {
            const { data, status, message } = await findAsync({ id });

            if (status !== 'success') {
    
            }
    
            if (status === 'success') {
                setContributionState(data);
            }

        } catch ({ message }) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message
            }));
        }
    }

    const onSubmitUpdateContribution = () => dispatch(CONTRIBUTION.updateContribution(contributionState));

    useEffect(() => {
        onLoadFetchContributionById();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateContribution }>
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
                                    value={ contributionState.name }
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
                                    value={ contributionState.rate }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(contributionState.enabled) } 
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
                            cancelBtnCallback={ () => history.push(PATH.CONTRIBUTION) }
                            saveBtnCallback={ onSubmitUpdateContribution }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    contributionProp: selectContribution
});

export default connect(mapStateToProps, null)(UpdateContribution)
