import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

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

const EMPLOYEE_DEFAULT_PROPS = {
    id: 0,
    role_id: '',
    first_name: '',
    last_name: '',
    birth_date: DATE.today(),
    gender: '',
    email: '',
    phone: '',
    address: '',
    image: null,
    enabled: false,
};

const SALARY_DEFAULT_PROPS = {
    currency_id: '',
    amount: 0,
    tax_number: '',
    bank_account_number: '',
    hired_at: DATE.today()
}

const ERROR_DEFAULT= {
    currency_id: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    image: '',
    enabled: '',
    currency_id: '',
    amount: '',
    tax_number: '',
    bank_account_number: '',
    hired_at: '',
    role_id: '',
    create_user: ''
};

const initialState = {
    isLoading: false,
    employee: EMPLOYEE_DEFAULT_PROPS,
    salary: SALARY_DEFAULT_PROPS,
    employees: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        employees
    } = state;

    switch (type) 
    {
        case GET_EMPLOYEES_START:
        case CREATE_EMPLOYEE_START:
        case UPDATE_EMPLOYEE_START:
        case DESTROY_EMPLOYEES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_EMPLOYEES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                employees: payload.employees,
                error: ERROR_DEFAULT
            };

        case GET_EMPLOYEES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_EMPLOYEE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_EMPLOYEE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_EMPLOYEE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_EMPLOYEE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_EMPLOYEES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                employees: employees.filter(({ id }) => !payload.ids.includes(id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_EMPLOYEES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
