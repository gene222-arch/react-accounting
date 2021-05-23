import ACTION_TYPES from './action.types';

const {
    GET_DEFAULT_SETTINGS_START,
    GET_DEFAULT_SETTINGS_SUCCESS,
    GET_DEFAULT_SETTINGS_FAILED,

    UPDATE_DEFAULT_SETTINGS_START,
    UPDATE_DEFAULT_SETTINGS_SUCCESS,
    UPDATE_DEFAULT_SETTINGS_FAILED,
} = ACTION_TYPES;


export const getDefaultSettings = (payload) => ({
    type: GET_DEFAULT_SETTINGS_START,
    payload
});

export const getDefaultSettingsSuccess = (payload) => ({
    type: GET_DEFAULT_SETTINGS_SUCCESS,
    payload
});

export const getDefaultSettingsFailed = (payload) => ({
    type: GET_DEFAULT_SETTINGS_FAILED,
    payload
});

export const updateDefaultSettings = (payload) => ({
    type: UPDATE_DEFAULT_SETTINGS_START,
    payload
});

export const updateDefaultSettingsSuccess = (payload) => ({
    type: UPDATE_DEFAULT_SETTINGS_SUCCESS,
    payload
});

export const updateDefaultSettingsFailed = (payload) => ({
    type: UPDATE_DEFAULT_SETTINGS_FAILED,
    payload
});
