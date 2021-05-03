import ACTION_TYPES from './action.types';

const {
    GET_INCOME_CATEGORIES_START,
    GET_INCOME_CATEGORIES_SUCCESS,
    GET_INCOME_CATEGORIES_FAILED,

    CREATE_INCOME_CATEGORY_START,
    CREATE_INCOME_CATEGORY_SUCCESS,
    CREATE_INCOME_CATEGORY_FAILED,

    UPDATE_INCOME_CATEGORY_START,
    UPDATE_INCOME_CATEGORY_SUCCESS,
    UPDATE_INCOME_CATEGORY_FAILED,

    DESTROY_INCOME_CATEGORIES_START,
    DESTROY_INCOME_CATEGORIES_SUCCESS,
    DESTROY_INCOME_CATEGORIES_FAILED
} = ACTION_TYPES;


export const getIncomeCategories = (payload = {}) => ({
    type: GET_INCOME_CATEGORIES_START,
    payload
});

export const getIncomeCategoriesSuccess = (payload) => ({
    type: GET_INCOME_CATEGORIES_SUCCESS,
    payload
});

export const getIncomeCategoriesFailed = (payload) => ({
    type: GET_INCOME_CATEGORIES_FAILED,
    payload
});

export const createIncomeCategory = (payload) => ({
    type: CREATE_INCOME_CATEGORY_START,
    payload
});

export const createIncomeCategorySuccess = () => ({
    type: CREATE_INCOME_CATEGORY_SUCCESS
});

export const createIncomeCategoryFailed = (payload) => ({
    type: CREATE_INCOME_CATEGORY_FAILED,
    payload
});

export const updateIncomeCategory = (payload) => ({
    type: UPDATE_INCOME_CATEGORY_START,
    payload
});

export const updateIncomeCategorySuccess = () => ({
    type: UPDATE_INCOME_CATEGORY_SUCCESS
});

export const updateIncomeCategoryFailed = (payload) => ({
    type: UPDATE_INCOME_CATEGORY_FAILED,
    payload
});

export const destroyIncomeCategories = (payload) => ({
    type: DESTROY_INCOME_CATEGORIES_START,
    payload
});

export const destroyIncomeCategoriesSuccess = (payload) => ({
    type: DESTROY_INCOME_CATEGORIES_SUCCESS,
    payload
});

export const destroyIncomeCategoriesFailed = (payload) => ({
    type: DESTROY_INCOME_CATEGORIES_FAILED,
    payload
});