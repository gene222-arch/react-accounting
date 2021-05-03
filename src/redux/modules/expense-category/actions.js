import ACTION_TYPES from './action.types';

const {
    GET_EXPENSE_CATEGORIES_START,
    GET_EXPENSE_CATEGORIES_SUCCESS,
    GET_EXPENSE_CATEGORIES_FAILED,

    CREATE_EXPENSE_CATEGORY_START,
    CREATE_EXPENSE_CATEGORY_SUCCESS,
    CREATE_EXPENSE_CATEGORY_FAILED,

    UPDATE_EXPENSE_CATEGORY_START,
    UPDATE_EXPENSE_CATEGORY_SUCCESS,
    UPDATE_EXPENSE_CATEGORY_FAILED,

    DESTROY_EXPENSE_CATEGORIES_START,
    DESTROY_EXPENSE_CATEGORIES_SUCCESS,
    DESTROY_EXPENSE_CATEGORIES_FAILED
} = ACTION_TYPES;


export const getExpenseCategories = (payload = {}) => ({
    type: GET_EXPENSE_CATEGORIES_START,
    payload
});

export const getExpenseCategoriesSuccess = (payload) => ({
    type: GET_EXPENSE_CATEGORIES_SUCCESS,
    payload
});

export const getExpenseCategoriesFailed = (payload) => ({
    type: GET_EXPENSE_CATEGORIES_FAILED,
    payload
});

export const createExpenseCategory = (payload) => ({
    type: CREATE_EXPENSE_CATEGORY_START,
    payload
});

export const createExpenseCategorySuccess = () => ({
    type: CREATE_EXPENSE_CATEGORY_SUCCESS
});

export const createExpenseCategoryFailed = (payload) => ({
    type: CREATE_EXPENSE_CATEGORY_FAILED,
    payload
});

export const updateExpenseCategory = (payload) => ({
    type: UPDATE_EXPENSE_CATEGORY_START,
    payload
});

export const updateExpenseCategorySuccess = () => ({
    type: UPDATE_EXPENSE_CATEGORY_SUCCESS
});

export const updateExpenseCategoryFailed = (payload) => ({
    type: UPDATE_EXPENSE_CATEGORY_FAILED,
    payload
});

export const destroyExpenseCategories = (payload) => ({
    type: DESTROY_EXPENSE_CATEGORIES_START,
    payload
});

export const destroyExpenseCategoriesSuccess = (payload) => ({
    type: DESTROY_EXPENSE_CATEGORIES_SUCCESS,
    payload
});

export const destroyExpenseCategoriesFailed = (payload) => ({
    type: DESTROY_EXPENSE_CATEGORIES_FAILED,
    payload
});