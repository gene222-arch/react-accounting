import ACTION_TYPES from './action.types';

const {
    GET_ITEMS_START,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,

    CREATE_ITEM_START,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILED,

    UPDATE_ITEM_START,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILED,

    DESTROY_ITEMS_START,
    DESTROY_ITEMS_SUCCESS,
    DESTROY_ITEMS_FAILED
} = ACTION_TYPES;


export const getItems = (payload = {}) => ({
    type: GET_ITEMS_START,
    payload
});

export const getItemsSuccess = (payload) => ({
    type: GET_ITEMS_SUCCESS,
    payload
});

export const getItemsFailed = (payload) => ({
    type: GET_ITEMS_FAILED,
    payload
});

export const createItem = (payload) => ({
    type: CREATE_ITEM_START,
    payload
});

export const createItemSuccess = () => ({
    type: CREATE_ITEM_SUCCESS
});

export const createItemFailed = (payload) => ({
    type: CREATE_ITEM_FAILED,
    payload
});

export const updateItem = (payload) => ({
    type: UPDATE_ITEM_START,
    payload
});

export const updateItemSuccess = () => ({
    type: UPDATE_ITEM_SUCCESS
});

export const updateItemFailed = (payload) => ({
    type: UPDATE_ITEM_FAILED,
    payload
});

export const destroyItems = (payload) => ({
    type: DESTROY_ITEMS_START,
    payload
});

export const destroyItemsSuccess = () => ({
    type: DESTROY_ITEMS_SUCCESS
});

export const destroyItemsFailed = (payload) => ({
    type: DESTROY_ITEMS_FAILED,
    payload
});