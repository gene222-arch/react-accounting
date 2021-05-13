import ACTION_TYPES from './action.types';

const {
    GET_ACCESS_RIGHTS_START,
    GET_ACCESS_RIGHTS_SUCCESS,
    GET_ACCESS_RIGHTS_FAILED,

    CREATE_ACCESS_RIGHT_START,
    CREATE_ACCESS_RIGHT_SUCCESS,
    CREATE_ACCESS_RIGHT_FAILED,

    UPDATE_ACCESS_RIGHT_START,
    UPDATE_ACCESS_RIGHT_SUCCESS,
    UPDATE_ACCESS_RIGHT_FAILED,

    DESTROY_ACCESS_RIGHTS_START,
    DESTROY_ACCESS_RIGHTS_SUCCESS,
    DESTROY_ACCESS_RIGHTS_FAILED
} = ACTION_TYPES;


export const getAccessRights = (payload = {}) => ({
    type: GET_ACCESS_RIGHTS_START,
    payload
});

export const getAccessRightsSuccess = (payload) => ({
    type: GET_ACCESS_RIGHTS_SUCCESS,
    payload
});

export const getAccessRightsFailed = (payload) => ({
    type: GET_ACCESS_RIGHTS_FAILED,
    payload
});

export const createAccessRight = (payload) => ({
    type: CREATE_ACCESS_RIGHT_START,
    payload
});

export const createAccessRightSuccess = () => ({
    type: CREATE_ACCESS_RIGHT_SUCCESS
});

export const createAccessRightFailed = (payload) => ({
    type: CREATE_ACCESS_RIGHT_FAILED,
    payload
});

export const updateAccessRight = (payload) => ({
    type: UPDATE_ACCESS_RIGHT_START,
    payload
});

export const updateAccessRightSuccess = () => ({
    type: UPDATE_ACCESS_RIGHT_SUCCESS
});

export const updateAccessRightFailed = (payload) => ({
    type: UPDATE_ACCESS_RIGHT_FAILED,
    payload
});

export const destroyAccessRights = (payload) => ({
    type: DESTROY_ACCESS_RIGHTS_START,
    payload
});

export const destroyAccessRightsSuccess = (payload) => ({
    type: DESTROY_ACCESS_RIGHTS_SUCCESS,
    payload
});

export const destroyAccessRightsFailed = (payload) => ({
    type: DESTROY_ACCESS_RIGHTS_FAILED,
    payload
});