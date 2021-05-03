import ACTION_TYPES from './action.types';

const {
    GET_VENDORS_START,
    GET_VENDORS_SUCCESS,
    GET_VENDORS_FAILED,

    CREATE_VENDOR_START,
    CREATE_VENDOR_SUCCESS,
    CREATE_VENDOR_FAILED,

    UPDATE_VENDOR_START,
    UPDATE_VENDOR_SUCCESS,
    UPDATE_VENDOR_FAILED,

    DESTROY_VENDORS_START,
    DESTROY_VENDORS_SUCCESS,
    DESTROY_VENDORS_FAILED
} = ACTION_TYPES;


export const getVendors = (payload = {}) => ({
    type: GET_VENDORS_START,
    payload
});

export const getVendorsSuccess = (payload) => ({
    type: GET_VENDORS_SUCCESS,
    payload
});

export const getVendorsFailed = (payload) => ({
    type: GET_VENDORS_FAILED,
    payload
});

export const createVendor = (payload) => ({
    type: CREATE_VENDOR_START,
    payload
});

export const createVendorSuccess = () => ({
    type: CREATE_VENDOR_SUCCESS
});

export const createVendorFailed = (payload) => ({
    type: CREATE_VENDOR_FAILED,
    payload
});

export const updateVendor = (payload) => ({
    type: UPDATE_VENDOR_START,
    payload
});

export const updateVendorSuccess = () => ({
    type: UPDATE_VENDOR_SUCCESS
});

export const updateVendorFailed = (payload) => ({
    type: UPDATE_VENDOR_FAILED,
    payload
});

export const destroyVendors = (payload) => ({
    type: DESTROY_VENDORS_START,
    payload
});

export const destroyVendorsSuccess = (payload) => ({
    type: DESTROY_VENDORS_SUCCESS,
    payload
});

export const destroyVendorsFailed = (payload) => ({
    type: DESTROY_VENDORS_FAILED,
    payload
});