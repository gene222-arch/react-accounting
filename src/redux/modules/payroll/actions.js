import ACTION_TYPES from './action.types';

const {
    GET_PAYROLLS_START,
    GET_PAYROLLS_SUCCESS,
    GET_PAYROLLS_FAILED,

    CREATE_PAYROLL_START,
    CREATE_PAYROLL_SUCCESS,
    CREATE_PAYROLL_FAILED,

    APPROVE_PAYROLL_START,
    APPROVE_PAYROLL_SUCCESS,
    APPROVE_PAYROLL_FAILED,

    UPDATE_PAYROLL_START,
    UPDATE_PAYROLL_SUCCESS,
    UPDATE_PAYROLL_FAILED,

    DESTROY_PAYROLLS_START,
    DESTROY_PAYROLLS_SUCCESS,
    DESTROY_PAYROLLS_FAILED
} = ACTION_TYPES;


export const getPayrolls = (payload = {}) => ({
    type: GET_PAYROLLS_START,
    payload
});

export const getPayrollsSuccess = (payload) => ({
    type: GET_PAYROLLS_SUCCESS,
    payload
});

export const getPayrollsFailed = (payload) => ({
    type: GET_PAYROLLS_FAILED,
    payload
});

export const createPayroll = (payload) => ({
    type: CREATE_PAYROLL_START,
    payload
});

export const createPayrollSuccess = () => ({
    type: CREATE_PAYROLL_SUCCESS
});

export const createPayrollFailed = (payload) => ({
    type: CREATE_PAYROLL_FAILED,
    payload
});

export const approvePayroll = (payload) => ({
    type: APPROVE_PAYROLL_START,
    payload
});

export const approvePayrollSuccess = () => ({
    type: APPROVE_PAYROLL_SUCCESS
});

export const approvePayrollFailed = (payload) => ({
    type: APPROVE_PAYROLL_FAILED,
    payload
});

export const updatePayroll = (payload) => ({
    type: UPDATE_PAYROLL_START,
    payload
});

export const updatePayrollSuccess = () => ({
    type: UPDATE_PAYROLL_SUCCESS
});

export const updatePayrollFailed = (payload) => ({
    type: UPDATE_PAYROLL_FAILED,
    payload
});

export const destroyPayrolls = (payload) => ({
    type: DESTROY_PAYROLLS_START,
    payload
});

export const destroyPayrollsSuccess = (payload) => ({
    type: DESTROY_PAYROLLS_SUCCESS,
    payload
});

export const destroyPayrollsFailed = (payload) => ({
    type: DESTROY_PAYROLLS_FAILED,
    payload
});