import ACTION_TYPES from './action.types';

const {
    GET_WAREHOUSES_START,
    GET_WAREHOUSES_SUCCESS,
    GET_WAREHOUSES_FAILED,

    CREATE_WAREHOUSE_START,
    CREATE_WAREHOUSE_SUCCESS,
    CREATE_WAREHOUSE_FAILED,

    UPDATE_WAREHOUSE_START,
    UPDATE_WAREHOUSE_SUCCESS,
    UPDATE_WAREHOUSE_FAILED,

    DESTROY_WAREHOUSES_START,
    DESTROY_WAREHOUSES_SUCCESS,
    DESTROY_WAREHOUSES_FAILED
} = ACTION_TYPES;


export const getWarehouses = (payload = {}) => ({
    type: GET_WAREHOUSES_START,
    payload
});

export const getWarehousesSuccess = (payload) => ({
    type: GET_WAREHOUSES_SUCCESS,
    payload
});

export const getWarehousesFailed = (payload) => ({
    type: GET_WAREHOUSES_FAILED,
    payload
});

export const createWarehouse = (payload) => ({
    type: CREATE_WAREHOUSE_START,
    payload
});

export const createWarehouseSuccess = () => ({
    type: CREATE_WAREHOUSE_SUCCESS
});

export const createWarehouseFailed = (payload) => ({
    type: CREATE_WAREHOUSE_FAILED,
    payload
});

export const updateWarehouse = (payload) => ({
    type: UPDATE_WAREHOUSE_START,
    payload
});

export const updateWarehouseSuccess = () => ({
    type: UPDATE_WAREHOUSE_SUCCESS
});

export const updateWarehouseFailed = (payload) => ({
    type: UPDATE_WAREHOUSE_FAILED,
    payload
});

export const destroyWarehouses = (payload) => ({
    type: DESTROY_WAREHOUSES_START,
    payload
});

export const destroyWarehousesSuccess = (payload) => ({
    type: DESTROY_WAREHOUSES_SUCCESS,
    payload
});

export const destroyWarehousesFailed = (payload) => ({
    type: DESTROY_WAREHOUSES_FAILED,
    payload
});