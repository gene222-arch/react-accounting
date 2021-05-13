import ACTION_TYPES from './action.types';

const {
    GET_PAY_CALENDARS_START,
    GET_PAY_CALENDARS_SUCCESS,
    GET_PAY_CALENDARS_FAILED,

    CREATE_PAY_CALENDAR_START,
    CREATE_PAY_CALENDAR_SUCCESS,
    CREATE_PAY_CALENDAR_FAILED,

    UPDATE_PAY_CALENDAR_START,
    UPDATE_PAY_CALENDAR_SUCCESS,
    UPDATE_PAY_CALENDAR_FAILED,

    DESTROY_PAY_CALENDARS_START,
    DESTROY_PAY_CALENDARS_SUCCESS,
    DESTROY_PAY_CALENDARS_FAILED
} = ACTION_TYPES;


export const getPayCalendars = (payload = {}) => ({
    type: GET_PAY_CALENDARS_START,
    payload
});

export const getPayCalendarsSuccess = (payload) => ({
    type: GET_PAY_CALENDARS_SUCCESS,
    payload
});

export const getPayCalendarsFailed = (payload) => ({
    type: GET_PAY_CALENDARS_FAILED,
    payload
});

export const createPayCalendar = (payload) => ({
    type: CREATE_PAY_CALENDAR_START,
    payload
});

export const createPayCalendarSuccess = () => ({
    type: CREATE_PAY_CALENDAR_SUCCESS
});

export const createPayCalendarFailed = (payload) => ({
    type: CREATE_PAY_CALENDAR_FAILED,
    payload
});

export const updatePayCalendar = (payload) => ({
    type: UPDATE_PAY_CALENDAR_START,
    payload
});

export const updatePayCalendarSuccess = () => ({
    type: UPDATE_PAY_CALENDAR_SUCCESS
});

export const updatePayCalendarFailed = (payload) => ({
    type: UPDATE_PAY_CALENDAR_FAILED,
    payload
});

export const destroyPayCalendars = (payload) => ({
    type: DESTROY_PAY_CALENDARS_START,
    payload
});

export const destroyPayCalendarsSuccess = (payload) => ({
    type: DESTROY_PAY_CALENDARS_SUCCESS,
    payload
});

export const destroyPayCalendarsFailed = (payload) => ({
    type: DESTROY_PAY_CALENDARS_FAILED,
    payload
});