import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectCompany } from '../../../../redux/modules/company/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectAuth } from './../../../../redux/modules/auth/selector';

/** Actions */
import * as COMPANY from '../../../../redux/modules/company/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { Card, CardContent, CardActions } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';


const UpdateCompany = ({ alert, auth, companyProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, company, error } = companyProp;

    const [ companyState, setCompanyState ] = useState(auth.company);

    const handleChange = (e) => setCompanyState({ ...companyState, [e.target.name]: e.target.value });

    const onSubmitUpdateCompany = () => dispatch(COMPANY.updateCompany(companyState));

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
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
                                value={ companyState.name }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <InputLabel>Rate</InputLabel>
                            <TextField
                                fullWidth
                                name='email'
                                error={ Boolean(error.email) }
                                helperText={ error.email }
                                label='Enter Email'
                                value={ companyState.email }
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
                                value={ companyState.tax_number }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <InputLabel>Phone</InputLabel>
                            <TextField
                                fullWidth
                                name='phone'
                                error={ Boolean(error.phone) }
                                helperText={ error.phone }
                                label='Enter Tax number'
                                value={ companyState.phone }
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
                                label='Enter Tax number'
                                value={ companyState.address }
                                onChange={ handleChange }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <SaveCancelButtons 
                        isLoading={ isLoading }
                        cancelBtnCallback={ () => history.push(PATH.UPDATE_COMPANY) }
                        saveBtnCallback={ onSubmitUpdateCompany }
                    />
                </CardActions>
            </Card>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    auth: selectAuth,
    companyProp: selectCompany
});

export default connect(mapStateToProps, null)(UpdateCompany)
