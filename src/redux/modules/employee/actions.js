import ACTION_TYPES from './action.types';

const {
    GET_EMPLOYEES_START,
    GET_EMPLOYEES_SUCCESS,
    GET_EMPLOYEES_FAILED,

    CREATE_EMPLOYEE_START,
    CREATE_EMPLOYEE_SUCCESS,
    CREATE_EMPLOYEE_FAILED,

    UPDATE_EMPLOYEE_START,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAILED,

    DESTROY_EMPLOYEES_START,
    DESTROY_EMPLOYEES_SUCCESS,
    DESTROY_EMPLOYEES_FAILED
} = ACTION_TYPES;


export const getEmployees = (payload = {}) => ({
    type: GET_EMPLOYEES_START,
    payload
});

export const getEmployeesSuccess = (payload) => ({
    type: GET_EMPLOYEES_SUCCESS,
    payload
});

export const getEmployeesFailed = (payload) => ({
    type: GET_EMPLOYEES_FAILED,
    payload
});

export const createEmployee = (payload) => ({
    type: CREATE_EMPLOYEE_START,
    payload
});

export const createEmployeeSuccess = () => ({
    type: CREATE_EMPLOYEE_SUCCESS
});

export const createEmployeeFailed = (payload) => ({
    type: CREATE_EMPLOYEE_FAILED,
    payload
});

export const updateEmployee = (payload) => ({
    type: UPDATE_EMPLOYEE_START,
    payload
});

export const updateEmployeeSuccess = () => ({
    type: UPDATE_EMPLOYEE_SUCCESS
});

export const updateEmployeeFailed = (payload) => ({
    type: UPDATE_EMPLOYEE_FAILED,
    payload
});

export const destroyEmployees = (payload) => ({
    type: DESTROY_EMPLOYEES_START,
    payload
});

export const destroyEmployeesSuccess = (payload) => ({
    type: DESTROY_EMPLOYEES_SUCCESS,
    payload
});

export const destroyEmployeesFailed = (payload) => ({
    type: DESTROY_EMPLOYEES_FAILED,
    payload
});