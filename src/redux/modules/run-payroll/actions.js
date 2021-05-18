import ACTION_TYPES from './action.types';

const {
    GET_RUN_PAYROLLS_START,
    GET_RUN_PAYROLLS_SUCCESS,
    GET_RUN_PAYROLLS_FAILED,

    CREATE_RUN_PAYROLL_START,
    CREATE_RUN_PAYROLL_SUCCESS,
    CREATE_RUN_PAYROLL_FAILED,

    APPROVE_RUN_PAYROLL_START,
    APPROVE_RUN_PAYROLL_SUCCESS,
    APPROVE_RUN_PAYROLL_FAILED,

    UPDATE_RUN_PAYROLL_START,
    UPDATE_RUN_PAYROLL_SUCCESS,
    UPDATE_RUN_PAYROLL_FAILED,

    DESTROY_RUN_PAYROLLS_START,
    DESTROY_RUN_PAYROLLS_SUCCESS,
    DESTROY_RUN_PAYROLLS_FAILED
} = ACTION_TYPES;


export const getRunPayrolls = (payload = {}) => ({
    type: GET_RUN_PAYROLLS_START,
    payload
});

export const getRunPayrollsSuccess = (payload) => ({
    type: GET_RUN_PAYROLLS_SUCCESS,
    payload
});

export const getRunPayrollsFailed = (payload) => ({
    type: GET_RUN_PAYROLLS_FAILED,
    payload
});

export const createRunPayroll = (payload) => ({
    type: CREATE_RUN_PAYROLL_START,
    payload
});

export const createRunPayrollSuccess = () => ({
    type: CREATE_RUN_PAYROLL_SUCCESS
});

export const createRunPayrollFailed = (payload) => ({
    type: CREATE_RUN_PAYROLL_FAILED,
    payload
});

export const approveRunPayroll = (payload) => ({
    type: APPROVE_RUN_PAYROLL_START,
    payload
});

export const approveRunPayrollSuccess = (payload) => ({
    type: APPROVE_RUN_PAYROLL_SUCCESS,
    payload
});

export const approveRunPayrollFailed = (payload) => ({
    type: APPROVE_RUN_PAYROLL_FAILED,
    payload
});

export const updateRunPayroll = (payload) => ({
    type: UPDATE_RUN_PAYROLL_START,
    payload
});

export const updateRunPayrollSuccess = () => ({
    type: UPDATE_RUN_PAYROLL_SUCCESS
});

export const updateRunPayrollFailed = (payload) => ({
    type: UPDATE_RUN_PAYROLL_FAILED,
    payload
});

export const destroyRunPayrolls = (payload) => ({
    type: DESTROY_RUN_PAYROLLS_START,
    payload
});

export const destroyRunPayrollsSuccess = (payload) => ({
    type: DESTROY_RUN_PAYROLLS_SUCCESS,
    payload
});

export const destroyRunPayrollsFailed = (payload) => ({
    type: DESTROY_RUN_PAYROLLS_FAILED,
    payload
});