import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';

/** Actions */
import * as SALARY_BENEFIT from './../../../../redux/modules/salary-benefit/actions';
import * as TAX from './../../../../redux/modules/tax/actions';
import * as CONTRIBUTION from './../../../../redux/modules/contribution/actions';

/** Selectors */
import { selectSalaryBenefit } from './../../../../redux/modules/salary-benefit/selector';
import { selectTax } from './../../../../redux/modules/tax/selector';
import { selectContribution } from './../../../../redux/modules/contribution/selector';

/** Components */
import EmployeeProfile from './EmployeeProfile';
import Grid from '@material-ui/core/Grid'
import { createStructuredSelector } from 'reselect';
import BenefitsAndDeduction from './BenefitsAndDeduction';


const EMPLOYEE_PROFILE_DEFAULT_PROPS = {
    id: '',
    name: '',
    salary: '',
    benefit: 0,
    deduction: 0,
    total_amount: 0
};

const BenefitsAndDeductionStep = ({ 
        contributionProp, 
        salaryBenefitProp, 
        taxProp, 
        employeesState, 
        contributionsState, 
        setContributionsState,
        salaryBenefitsState, 
        setSalaryBenefitsState, 
        taxesState,
        setTaxesState }) => 
{
    const dispatch = useDispatch();

    const [ selectedEmployeeId, setSelectedEmployeeId ] = useState(1);
    const [ employeeProfile, setEmployeeProfile ] = useState(EMPLOYEE_PROFILE_DEFAULT_PROPS);

    const setEmployeeProfileInfo = (idParam = null) => 
    {
        const employee = employeesState.find(({ id }) => id === (idParam ?? parseInt(selectedEmployeeId)));

        setEmployeeProfile({ ...employeeProfile, ...employee });
    }

    const handleChangeSelectedEmployee = (e) =>
    {   
        const { name, value } = e.target;

        setSelectedEmployeeId(value)
        setEmployeeProfileInfo(parseInt(value));
    }

    const onLoadFetchSalaryBenefits = () => dispatch(SALARY_BENEFIT.getSalaryBenefits());

    const onLoadFetchTaxes = () => dispatch(TAX.getTaxes());

    const onLoadFetchContributions = () => dispatch(CONTRIBUTION.getContributions());

    useEffect(() => {
        onLoadFetchSalaryBenefits();
        onLoadFetchTaxes();
        onLoadFetchContributions();
        setEmployeeProfileInfo();
    }, []); 

    useEffect(() => {
        setEmployeeProfileInfo();
    }, [employeesState]);

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <EmployeeProfile 
                        employeesState={ employeesState }
                        selectedEmployeeId={ selectedEmployeeId }
                        employeeProfile={ employeeProfile }
                        handleChangeSelectedEmployee={ handleChangeSelectedEmployee }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <BenefitsAndDeduction 
                        contributions= { contributionProp.contributions }
                        salaryBenefits={ salaryBenefitProp.salaryBenefits }
                        taxes= { taxProp.taxes }
                        contributionsState={ contributionsState }
                        setContributionsState={ setContributionsState }
                        salaryBenefitsState={ salaryBenefitsState }
                        setSalaryBenefitsState={ setSalaryBenefitsState }
                        taxesState={ taxesState }
                        setTaxesState={ setTaxesState }
                    />
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProp = createStructuredSelector({
    contributionProp: selectContribution,
    salaryBenefitProp: selectSalaryBenefit,
    taxProp: selectTax
});

export default connect(mapStateToProp, null)(BenefitsAndDeductionStep)
