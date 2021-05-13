import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** API */
import { findAsync } from './../../../../services/payroll/pay.calendar';

/** Selectors */
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectPayCalendar } from './../../../../redux/modules/pay-calendar/selector';
import { selectEmployee } from './../../../../redux/modules/employee/selector';

/** Actions */
import * as ALERT from '../../../../redux/modules/alert/actions'
import * as PAY_CALENDAR from './../../../../redux/modules/pay-calendar/actions';
import * as EMPLOYEE from './../../../../redux/modules/employee/actions';

/** Material UI Components */
import { Card, CardContent, CardActions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { FormControl, FormControlLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField'

/** Material Ui Styles */
import { makeStyles, Typography } from '@material-ui/core';

/** Material UI Icon */
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReorderIcon from '@material-ui/icons/Reorder';

/** Components */
import SaveCancelButtons from './../../../../components/SaveCancelButtons';
import AlertPopUp from './../../../../components/AlertPopUp';

import PATH from './../../../../routes/path';

const TYPES = [
    'Weekly',
    'Bi-weekly',
    'Semi-monthly',
    'Monthly'
];

const UpdatePayCalendar = ({ alert, employeeProp, payCalendarProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, payCalendar, error } = payCalendarProp;

    const [ payCalendarState, setPayCalendarState ] = useState(payCalendar);

    const handleChangePayCalendar = (e, isChecked) => {
        const { name, value, checked } = e.target;

        if (name !== 'employee_ids') {
            setPayCalendarState({ ...payCalendarState, [name]: value });
        }

        if (name === 'employee_ids') {
            isChecked 
                ? setPayCalendarState({ ...payCalendarState, employee_ids: [...payCalendarState.employee_ids, parseInt(value)] })
                : setPayCalendarState({ ...payCalendarState, employee_ids: payCalendarState.employee_ids.filter(id => id !== parseInt(value)) });
        }
    };

    const onLoadFetchPayCalendarById = async () => 
    {
        try {
            const { data, message, status } = await findAsync({ id });

            if (status !== 'success') {

            }

            if (status === 'success') {
                const { employees, ...payCalendar } = data;

                setPayCalendarState({
                    ...payCalendar,
                    employee_ids: employees.map(({ id }) => id)
                });
            }
        } catch ({ message }) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message
            }));
        }
    }

    const onLoadFetchEmployees = () => dispatch(EMPLOYEE.getEmployees());

    const onSubmitCreatePayCalendar = () => dispatch(PAY_CALENDAR.updatePayCalendar(payCalendarState));

    useEffect(() => {
        onLoadFetchPayCalendarById();
        onLoadFetchEmployees();
    }, []);

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <InputLabel id='name'>Name</InputLabel>
                                    <TextField
                                        id='name'
                                        name='name'
                                        error={ Boolean(error.name) }
                                        label="Enter name"
                                        value={ payCalendarState.name }
                                        onChange={ handleChangePayCalendar }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.type) } fullWidth>
                                        <InputLabel id='type'>Select Type</InputLabel>
                                        <Select
                                            id='type'
                                            name='type'
                                            IconComponent={ ReorderIcon }
                                            value={ payCalendarState.type }
                                            onChange={ handleChangePayCalendar }
                                            fullWidth
                                        >
                                            {
                                                TYPES.map((type, index) => (
                                                    <MenuItem key={ index } value={ type }>
                                                        { type }
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{ error.type }</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="initial">Employees</Typography>
                            {
                                employeeProp.employees.map(({ id, name }) => (
                                    <FormControlLabel
                                        key={ id }
                                        control={
                                            <Checkbox 
                                                checked={ payCalendarState.employee_ids.includes(parseInt(id)) }
                                                name='employee_ids'
                                                icon={ <RadioButtonUncheckedIcon /> } 
                                                checkedIcon={ <CheckCircleIcon /> } 
                                                onChange={ handleChangePayCalendar }
                                                value={ id }
                                        />}
                                        label={ name }
                                    />
                                ))
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <SaveCancelButtons
                                isLoading={ isLoading }
                                cancelBtnCallback={ () => history.push(PATH.PAY_CALENDAR) }
                                saveBtnCallback={ onSubmitCreatePayCalendar }
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    employeeProp: selectEmployee,
    payCalendarProp: selectPayCalendar
});

export default connect(mapStateToProps, null)(UpdatePayCalendar)