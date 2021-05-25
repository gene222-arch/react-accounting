import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { KeyboardDatePicker } from '@material-ui/pickers';

/** API */
import { findAsync } from '../../../services/employee/employee';

/** Selectors */
import { selectAccessRight } from '../../../redux/modules/access-right/selector';
import { selectEmployee } from '../../../redux/modules/employee/selector';
import { selectAlert } from '../../../redux/modules/alert/selector';

/** Actions */
import * as ACCESS_RIGHT from '../../../redux/modules/access-right/actions';
import * as EMPLOYEE from '../../../redux/modules/employee/actions';
import * as ALERT from '../../../redux/modules/alert/actions'

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
import SaveCancelButtons from '../../../components/SaveCancelButtons';
import AlertPopUp from '../../../components/AlertPopUp';

import PATH from '../../../routes/path';
import Salary from './Salary';

const CreateEmployee = ({ alert, accessRightProp, employeeProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, employee, salary, error } = employeeProp;

    const [ employeeState, setEmployeeState ] = useState(employee);
    const [ salaryState, setSalaryState ] = useState(salary);
    const [ createUser, setCreateUser ] = useState(false);

    const handleChangeEmployee = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled' 
            ? setEmployeeState({ ...employeeState, enabled: checked })
            : setEmployeeState({ ...employeeState, [name]: value });
    };

    const handleChangeBirthDate = (date) => setEmployeeState({ ...employeeState, birth_date: date });

    const handleChangeCreateUser = (e) => setCreateUser(e.target.checked); 

    const onLoadFetchEmployeeById = async () => 
    {
        try {
            const { data, message, status } = await findAsync({ id });

            if (status !== 'success') {
    
            }
    
            if (status === 'success') {
                const { salary, ...employeeData } = data;
                setEmployeeState(employeeData);
                setSalaryState(salary);
            }
        } catch ({ message }) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message
            }));
        }
    } 

    const onLoadFetchAccessRights = () => dispatch(ACCESS_RIGHT.getRoles());

    const onSubmitCreateEmployee = (e) => {
        e.preventDefault();
        dispatch(EMPLOYEE.updateEmployee({
            id,
            employee: employeeState,
            salary: salaryState,
            create_user: createUser
        }));
    }

    useEffect(() => {
        onLoadFetchEmployeeById();
        onLoadFetchAccessRights();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitCreateEmployee }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>First Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='first_name'
                                            error={ Boolean(error.first_name) }
                                            helperText={ error.first_name }
                                            label='Enter Name'
                                            value={ employeeState.first_name }
                                            onChange={ handleChangeEmployee }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Last Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='last_name'
                                            error={ Boolean(error.last_name) }
                                            helperText={ error.last_name }
                                            label='Enter Name'
                                            value={ employeeState.last_name }
                                            onChange={ handleChangeEmployee }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Email</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='email'
                                            error={ Boolean(error.email) }
                                            helperText={ error.email }
                                            label='Enter Email'
                                            value={ employeeState.email }
                                            onChange={ handleChangeEmployee }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Phone</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='phone'
                                            error={ Boolean(error.phone) }
                                            helperText={ error.phone }
                                            label='Enter Phone'
                                            value={ employeeState.phone }
                                            onChange={ handleChangeEmployee }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Birth date</InputLabel>
                                        <KeyboardDatePicker
                                            fullWidth
                                            name='dateFrom'
                                            variant='inline'
                                            format='yyyy-MM-dd'
                                            margin='normal'
                                            value={ employeeState.birth_date }
                                            onChange={ handleChangeBirthDate }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl error={ Boolean(error.gender) } fullWidth>
                                            <InputLabel>Gender</InputLabel>
                                            <Select
                                                name='gender'
                                                value={ employeeState.gender }
                                                onChange={ handleChangeEmployee }
                                                fullWidth
                                            >
                                                {
                                                    ['Male', 'Female'].map((name, index) => (
                                                        <MenuItem key={ index } value={ name }>
                                                            { name }
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            <FormHelperText>{ error.gender }</FormHelperText>
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl error={ Boolean(error.role_id) } fullWidth>
                                            <InputLabel>Position</InputLabel>
                                            <Select
                                                name='role_id'
                                                value={ employeeState.role_id }
                                                onChange={ handleChangeEmployee }
                                                fullWidth
                                            >
                                                {
                                                    accessRightProp.roles.map(({ id, name }) => (
                                                        <MenuItem key={ id } value={ id }>
                                                            { name }
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            <FormHelperText>{ error.role_id }</FormHelperText>
                                        </FormControl>
                                    </Grid>                  
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <InputLabel>Address</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='address'
                                            error={ Boolean(error.address) }
                                            helperText={ error.address }
                                            label='Enter Address'
                                            value={ employeeState.address }
                                            onChange={ handleChangeEmployee }
                                            multiline
                                            rows={ 3 }
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Switch 
                                                    checked={ Boolean(employeeState.enabled) } 
                                                    onChange={ handleChangeEmployee } 
                                                    name="enabled" 
                                                />}
                                            label="Enabled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Switch 
                                                    checked={ Boolean(createUser) } 
                                                    onChange={ handleChangeCreateUser } 
                                                    name="createUser" 
                                                />}
                                            label="Create User"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>                            
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Salary 
                                    salaryState={ salaryState }
                                    setSalaryState={ setSalaryState }
                                    error={ error }
                                />
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <SaveCancelButtons 
                                    isLoading={ isLoading }
                                    cancelBtnCallback={ () => history.push(PATH.VIEW_EMPLOYEE.replace(':id', id)) }
                                    saveBtnCallback={ onSubmitCreateEmployee }
                                />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>              
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    accessRightProp: selectAccessRight,
    employeeProp: selectEmployee
});

export default connect(mapStateToProps, null)(CreateEmployee)
