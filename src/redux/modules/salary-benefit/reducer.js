import ACTION_TYPES from './action.types';

const {
    GET_SALARY_BENEFITS_START,
    GET_SALARY_BENEFITS_SUCCESS,
    GET_SALARY_BENEFITS_FAILED,

    CREATE_SALARY_BENEFIT_START,
    CREATE_SALARY_BENEFIT_SUCCESS,
    CREATE_SALARY_BENEFIT_FAILED,

    UPDATE_SALARY_BENEFIT_START,
    UPDATE_SALARY_BENEFIT_SUCCESS,
    UPDATE_SALARY_BENEFIT_FAILED,

    DESTROY_SALARY_BENEFITS_START,
    DESTROY_SALARY_BENEFITS_SUCCESS,
    DESTROY_SALARY_BENEFITS_FAILED
} = ACTION_TYPES;

const SALARY_BENEFIT_DEFAULT_PROPS = {
    id: 0,
    type: '',
    amount: 0,
    enabled: false
};

const ERROR_DEFAULT= {
    type: '',
    amount: '',
    enabled: ''
};

const initialState = {
    isLoading: false,
    salaryBenefit: SALARY_BENEFIT_DEFAULT_PROPS,
    salaryBenefits: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        salaryBenefits
    } = state;

    switch (type) 
    {
        case GET_SALARY_BENEFITS_START:
        case CREATE_SALARY_BENEFIT_START:
        case UPDATE_SALARY_BENEFIT_START:
        case DESTROY_SALARY_BENEFITS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_SALARY_BENEFITS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                salaryBenefits: payload.salaryBenefits,
                error: ERROR_DEFAULT
            };

        case GET_SALARY_BENEFITS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_SALARY_BENEFIT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_SALARY_BENEFIT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_SALARY_BENEFIT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_SALARY_BENEFIT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_SALARY_BENEFITS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                salaryBenefits: salaryBenefits.filter(({ id }) => !payload.ids.includes(id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_SALARY_BENEFITS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
