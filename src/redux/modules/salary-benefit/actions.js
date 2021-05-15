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


export const getSalaryBenefits = (payload = {}) => ({
    type: GET_SALARY_BENEFITS_START,
    payload
});

export const getSalaryBenefitsSuccess = (payload) => ({
    type: GET_SALARY_BENEFITS_SUCCESS,
    payload
});

export const getSalaryBenefitsFailed = (payload) => ({
    type: GET_SALARY_BENEFITS_FAILED,
    payload
});

export const createSalaryBenefit = (payload) => ({
    type: CREATE_SALARY_BENEFIT_START,
    payload
});

export const createSalaryBenefitSuccess = () => ({
    type: CREATE_SALARY_BENEFIT_SUCCESS
});

export const createSalaryBenefitFailed = (payload) => ({
    type: CREATE_SALARY_BENEFIT_FAILED,
    payload
});

export const updateSalaryBenefit = (payload) => ({
    type: UPDATE_SALARY_BENEFIT_START,
    payload
});

export const updateSalaryBenefitSuccess = () => ({
    type: UPDATE_SALARY_BENEFIT_SUCCESS
});

export const updateSalaryBenefitFailed = (payload) => ({
    type: UPDATE_SALARY_BENEFIT_FAILED,
    payload
});

export const destroySalaryBenefits = (payload) => ({
    type: DESTROY_SALARY_BENEFITS_START,
    payload
});

export const destroySalaryBenefitsSuccess = (payload) => ({
    type: DESTROY_SALARY_BENEFITS_SUCCESS,
    payload
});

export const destroySalaryBenefitsFailed = (payload) => ({
    type: DESTROY_SALARY_BENEFITS_FAILED,
    payload
});