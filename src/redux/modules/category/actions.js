import ACTION_TYPES from './action.types';

const {
    GET_CATEGORIES_START,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED,

    CREATE_CATEGORY_START,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILED,

    UPDATE_CATEGORY_START,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED,

    DESTROY_CATEGORIES_START,
    DESTROY_CATEGORIES_SUCCESS,
    DESTROY_CATEGORIES_FAILED
} = ACTION_TYPES;


export const getCategories = (payload = {}) => ({
    type: GET_CATEGORIES_START,
    payload
});

export const getCategoriesSuccess = (payload) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload
});

export const getCategoriesFailed = (payload) => ({
    type: GET_CATEGORIES_FAILED,
    payload
});

export const createCategory = (payload) => ({
    type: CREATE_CATEGORY_START,
    payload
});

export const createCategorySuccess = () => ({
    type: CREATE_CATEGORY_SUCCESS
});

export const createCategoryFailed = (payload) => ({
    type: CREATE_CATEGORY_FAILED,
    payload
});

export const updateCategory = (payload) => ({
    type: UPDATE_CATEGORY_START,
    payload
});

export const updateCategorySuccess = () => ({
    type: UPDATE_CATEGORY_SUCCESS
});

export const updateCategoryFailed = (payload) => ({
    type: UPDATE_CATEGORY_FAILED,
    payload
});

export const destroyCategories = (payload) => ({
    type: DESTROY_CATEGORIES_START,
    payload
});

export const destroyCategoriesSuccess = (payload) => ({
    type: DESTROY_CATEGORIES_SUCCESS,
    payload
});

export const destroyCategoriesFailed = (payload) => ({
    type: DESTROY_CATEGORIES_FAILED,
    payload
});