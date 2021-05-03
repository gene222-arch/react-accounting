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


export const createCompany = (payload) => ({
    type: CREATE_COMPANY_START,
    payload
});

export const createCompanySuccess = () => ({
    type: CREATE_COMPANY_SUCCESS
});

export const createCompanyFailed = (payload) => ({
    type: CREATE_COMPANY_FAILED,
    payload
});

export const updateCompany = (payload) => ({
    type: UPDATE_COMPANY_START,
    payload
});

export const updateCompanySuccess = () => ({
    type: UPDATE_COMPANY_SUCCESS
});

export const updateCompanyFailed = (payload) => ({
    type: UPDATE_COMPANY_FAILED,
    payload
});

export const destroyCompanies = (payload) => ({
    type: DESTROY_COMPANIES_START,
    payload
});

export const destroyCompaniesSuccess = (payload) => ({
    type: DESTROY_COMPANIES_SUCCESS,
    payload
});

export const destroyCompaniesFailed = (payload) => ({
    type: DESTROY_COMPANIES_FAILED,
    payload
});