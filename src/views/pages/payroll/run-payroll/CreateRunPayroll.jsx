import React,{ useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { format } from 'date-fns'

/** API */
import { findAsync } from '../../../../services/payroll/pay.calendar'

/** Actions */
import * as ALERT from '../../../../redux/modules/alert/actions'
import * as RUN_PAYROLL from '../../../../redux/modules/run-payroll/actions'

/** Selectors */
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectRunPayroll } from './../../../../redux/modules/run-payroll/selector';
import { selectDefaultSettings } from './../../../../redux/modules/default-settings/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'

/** Components */
import RunPayrollProgress from './RunPayrollProgress';
import EmployeeStep from './EmployeeStep';
import BenefitsAndDeductionStep from './BenefitsAndDeductionStep';
import ApprovalStep from './ApprovalStep';
import PaySlipsStep from './PaySlipsStep';


const CreateRunPayroll = ({ alert, defaultSettingsProp, runPayrollProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { payCalendarId: id } = match.params;

    const { isLoading, runPayroll, error } = runPayrollProp;

    const RUN_PAYROLL_DEFAULT_PROPS = {
        ...runPayroll,
        account_id: defaultSettingsProp.defaultSettings.account_id,
        payment_method_id: defaultSettingsProp.defaultSettings.payment_method_id,
        expense_category_id: defaultSettingsProp.defaultSettings.expense_category_id
    };

    const [activeStep, setActiveStep] = useState(0);
    const [ employeesState, setEmployeesState ] = useState([]); 
    const [ runPayrollState, setRunPayrollState ] = useState(RUN_PAYROLL_DEFAULT_PROPS);
    const [ contributionsState, setContributionsState ] = useState([]);
    const [ salaryBenefitsState, setSalaryBenefitsState ] = useState([]);
    const [ taxesState, setTaxesState ] = useState([]);

    const [ stepHasError, setStepHasError ] = useState({
        employeeStep: {
            label: 'Employees',
            hasError: false
        },
        benefitsAndDeductionStep: {
            label: 'Benefits and Deductions',
            hasError: false
        },
        paySlipsStep: {
            label: 'PaySlips',
            hasError: false
        },
        approvalStep: {
            label: 'Approval',
            hasError: false
        }
    });

    const handleNext = () => 
    {
        const { name, account_id, expense_category_id, payment_method_id } = runPayrollState;

        switch (activeStep) 
        {
            case 0:
                if (!(name && account_id && expense_category_id && payment_method_id)) {
                    
                } else {
                    setActiveStep(activeStep + 1);
                }
                break;
            case 1: 
            case 2: 
                setActiveStep(activeStep + 1);
                break;
            default:
                break;
        }

    }

    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

    const handleReset = () => setActiveStep(0);

    const handleChangeRunPayroll = (e) => setRunPayrollState({ ...runPayrollState, [e.target.name]: e.target.value });

    const handleChangeEmployeesState = () => 
    {
        let employees = [...employeesState];

        employees = employees.map(({ salary, ...employee }) => 
        {
            salary = parseFloat(salary);

            let benefit = salaryBenefitsState.reduce((totalBenefits, { amount }) => (
                parseFloat(totalBenefits) + parseFloat(amount)
            ), 0);

            let contribution = contributionsState.reduce((totalContributions, { rate }) => (
                parseFloat(totalContributions) + (salary * ( parseFloat(rate) / 100 ))
            ), 0);

            let tax = taxesState.reduce((totalTaxes, { rate }) => (
                parseFloat(totalTaxes) + (salary * ( parseFloat(rate) / 100 ))
            ), 0);

            const deduction = tax + contribution;
            const total_amount = (salary + benefit) - deduction;

            return {
                ...employee,
                salary,
                benefit,
                deduction: tax + contribution,
                total_amount
            };
        });
        
        setEmployeesState(employees);
    }

    const onLoadFetchPayCalendarById = async () => 
    {
        try {
            const { data, message, status } = await findAsync({ id });

            if (status !== 'success') {

            }

            if (status === 'success') 
            {
                const { employees } = data;

                if (employees.length) 
                {   
                    const employees_ = employees.map(({ salary, role, ...employee }) => ({
                        id: employee.id,
                        name: `${ employee.first_name } ${ employee.last_name }`,
                        position: role.name,
                        salary: parseFloat(salary.amount),
                        benefit: 0,
                        deduction: 0,
                        total_amount: parseFloat(salary.amount),
                        tax_number: salary.tax_number,
                        bank_account_number: salary.bank_account_number
                    }));

                    setEmployeesState(employees_);

                    console.log(employees_)
                }
            }
        } catch ({ message }) {

        }
    }

    const onSubmitCreateRunPayroll = (status = 'Unapproved') => 
    {
        let details = [...employeesState];
        let benefits = [];
        let contributions = [];
        let taxes = [];

        employeesState.map(({ id: employee_id, salary, ...employee }) => 
        {
            salary = parseFloat(salary);

            benefits = salaryBenefitsState.map(({ id: salary_benefit_id, amount }) => ({
                employee_id,
                salary_benefit_id,
                amount
            }));

            contributions = contributionsState.map(({ id: contribution_id, rate }) => ({
                employee_id,
                contribution_id,
                amount: salary * (rate / 100)
            }));

            taxes = taxesState.map(({ id: tax_id, rate }) => ({
                employee_id,
                tax_id,
                amount: salary * (rate / 100)
            }));
        });

        details = details.map(({ id, tableData, name, bank_account_number, tax_number, position, ...employee }) => ({
            ...employee,
            employee_id: id
        }));

        dispatch(RUN_PAYROLL.createRunPayroll({
            ...runPayrollState,
            pay_calendar_id: id,
            status,
            details,
            benefits,
            contributions,
            taxes
        }));

        hasError();
    }

    const hasError = () => 
    {
        if (error.name || error.payment_method_id || error.account_id || error.expense_category_id) {
            setStepHasError({
                ...stepHasError,
                employeeStep: {
                    ...stepHasError.employeeStep,
                    hasError: true
                }
            });
        }
        else {
            setStepHasError({ ...stepHasError });
        }
    }

    const getStepContent = () => 
    {
        switch (activeStep) {
            case 0:
                return (
                    <EmployeeStep 
                        employeesState={ employeesState }
                        runPayrollState={ runPayrollState } 
                        setRunPayrollState={ setRunPayrollState } 
                        handleChangeRunPayroll={ handleChangeRunPayroll }
                        error={ error }
                    />
                )
            case 1:
                return (
                    <BenefitsAndDeductionStep 
                        employeesState={ employeesState }
                        contributionsState={ contributionsState }
                        setContributionsState={ setContributionsState }
                        salaryBenefitsState={ salaryBenefitsState }
                        setSalaryBenefitsState={ setSalaryBenefitsState }
                        taxesState={ taxesState }
                        setTaxesState={ setTaxesState }
                    />
                )
            case 2:
                return (
                    <PaySlipsStep 
                        employeesState={ employeesState } 
                        runPayrollState={ runPayrollState }
                    />
                );
            case 3:
                return (
                    <ApprovalStep 
                        runPayrollState={ runPayrollState } 
                        setRunPayrollState={ setRunPayrollState }
                        setRunPayrollState={ setRunPayrollState }
                        employeesState={ employeesState } 
                        error={ error }
                    />
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    useEffect(() => {
        onLoadFetchPayCalendarById();
    }, []);

    useEffect(() => {
        handleChangeEmployeesState();
    }, [contributionsState, salaryBenefitsState, taxesState]);

    return (
        <>
            <RunPayrollProgress
                activeStep={ activeStep }
                handleNext={ handleNext }
                handleBack={ handleBack }
                handleReset={ handleReset }
                actionOnSubmit={ onSubmitCreateRunPayroll }
                stepHasError={ stepHasError }
                isLoading={ isLoading }
            >
                { getStepContent() }
            </RunPayrollProgress>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    defaultSettingsProp: selectDefaultSettings,
    runPayrollProp: selectRunPayroll
});

export default connect(mapStateToProps, null)(CreateRunPayroll)
