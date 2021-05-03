import ACTION_TYPES from './action.types';

const {

    CREATE_COMPANY_START,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_FAILED,

    UPDATE_COMPANY_START,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_FAILED,

    DESTROY_COMPANIES_START,
    DESTROY_COMPANIES_SUCCESS,
    DESTROY_COMPANIES_FAILED
} = ACTION_TYPES;

const COMPANY_DEFAULT_PROPS = {
    id: 0,
    name: '',
    email: '',
    tax_number: '',
    phone: '',
    address: '',
    logo: null
};

const ERROR_DEFAULT= {
    name: '',
    email: '',
    tax_number: '',
    phone: '',
    address: '',
    logo: null
};

const initialState = {
    isLoading: false,
    company: COMPANY_DEFAULT_PROPS,
    companies: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        companies
    } = state;

    switch (type) 
    {
        case CREATE_COMPANY_START:
        case UPDATE_COMPANY_START:
        case DESTROY_COMPANIES_START:
            return { 
                ...state, 
                isLoading: true 
            };
        
        case CREATE_COMPANY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_COMPANY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_COMPANY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_COMPANY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_COMPANIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                companies: companies.filter(company => !payload.ids.includes(company.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_COMPANIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
