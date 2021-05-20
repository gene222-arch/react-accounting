import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

/** API */
import { findAsync } from '../../../../services/employee/employee';

/** Selectors */
import { selectEmployee } from './../../../../redux/modules/employee/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Card, CardContent } from '@material-ui/core'

/** Components */
import EmployeeProfile from './EmployeeProfile';
import EmployeePayroll from './EmployeePayroll';
import { makeStyles } from '@material-ui/core/styles';
import PATH from './../../../../routes/path';


const viewEmployeeUseStyles = makeStyles(theme => ({
    btn: {
        '&:hover': {
            color: '#FFF',
            opacity: 0.7,
            backgroundColor: theme.palette.primary.main
        }
    }
}));

const ViewEmployee = ({ employeeProp, match }) => 
{
    const classes = viewEmployeeUseStyles();
    const history = useHistory();
    const { id } = match.params;

    const [ payrollsState, setPayrollsState ] = useState({ 
        totalPayment: 0, 
        totalBenefit: 0, 
        totalDeduction: 0, 
        paymentHistories: [],
        benefitHistories: [],
        contributionHistories: [],
        taxHistories: []
    });
    const [ employeeState, setEmployeeState ] = useState(employeeProp.employee);
    const [ salaryState, setSalaryState ] = useState(employeeProp.salary);
    const [ selectedSlide, setSelectedSlide ] = useState('profile');

    const displaySlideOnClick = () => 
    {
        if (selectedSlide === 'profile') {
            return <EmployeeProfile employee={ employeeState } />
        }

        if (selectedSlide === 'payroll') {
            return <EmployeePayroll payrolls={ payrollsState } />
        }
    }

    const handleClickSelectSlide = (slide) => setSelectedSlide(slide);

    const onLoadFetchEmployeeById = async () =>
    {
        try {
            const { data, message, status } = await findAsync({ id });

            console.log(data);

            if (status !== 'success') {

            }

            if (status === 'success') 
            {
                const { salary, role, payrolls, benefits, contributions, taxes, ...employee } = data;
                let totalBenefit = 0;
                let totalDeduction = 0;
                let totalPayment = 0;
                let benefitHistories = [];
                let contributionHistories = [];
                let paymentHistories = [];
                let taxHistories = [];

                paymentHistories = payrolls.map(({ id, payment_date, name, pivot }) => ({
                    id,
                    paymentDate: payment_date,
                    name,
                    salary: pivot.salary,
                    totalBenefit: pivot.benefit,
                    totalDeduction: pivot.deduction,
                    totalPayment: pivot.total_amount
                }));

                totalBenefit = paymentHistories.reduce((total, { totalBenefit }) => total + parseFloat(totalBenefit), 0).toFixed(2);
                totalDeduction = paymentHistories.reduce((total, { totalDeduction }) => total + parseFloat(totalDeduction), 0).toFixed(2);
                totalPayment = paymentHistories.reduce((total, { totalPayment }) => total + parseFloat(totalPayment), 0).toFixed(2);

                benefitHistories = benefits.map(({ id, type, amount, ...benefit }) => ({
                    id,
                    type,
                    amount
                }));

                contributionHistories = contributions.map(({ id, name, pivot, ...contribution }) => ({
                    id,
                    name,
                    amount: pivot.amount
                }));

                taxHistories = taxes.map(({ id, name, pivot, ...tax }) => ({
                    id,
                    name,
                    amount: pivot.amount
                }));

                setEmployeeState({
                    ...employee,
                    name: `${ employee.first_name } ${ employee.last_name }`,
                    role: role.name
                });

                setSalaryState(salary);
                
                setPayrollsState({
                    ...payrollsState,
                    totalBenefit,
                    totalDeduction,
                    totalPayment,
                    paymentHistories,
                    benefitHistories,
                    contributionHistories,
                    taxHistories
                });
            }
        } catch ({ message }) {
            alert(404);
        }
    }

    useEffect(() => {
        onLoadFetchEmployeeById();
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Button 
                                id='profile'
                                variant={ selectedSlide !== 'profile' ? 'text' : 'contained' } 
                                color={ selectedSlide !== 'profile' ? 'default' : 'primary' } 
                                className={ classes.btn } 
                                fullWidth
                                onClick={ () => handleClickSelectSlide('profile') }
                            >
                              Profile
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Button 
                                id='payroll'
                                variant={ selectedSlide !== 'payroll' ? 'text' : 'contained'} 
                                color={ selectedSlide !== 'payroll' ? 'default' : 'primary' } 
                                className={ classes.btn } 
                                fullWidth
                                onClick={ () => handleClickSelectSlide('payroll') }
                            >
                                Payroll
                            </Button>                            
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    { displaySlideOnClick() }
                </Grid>
                {
                    selectedSlide !== 'payroll' && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button 
                                variant="contained" 
                                color="default" 
                                fullWidth
                                onClick={ () => history.push(PATH.UPDATE_EMPLOYEE.replace(':id', id))}
                            >
                                Edit
                            </Button>
                        </Grid>
                    )

                }
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    employeeProp: selectEmployee
});

export default connect(mapStateToProps, null)(ViewEmployee)
