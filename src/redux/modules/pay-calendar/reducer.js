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


const PAY_CALENDAR_DEFAULT_PROPS = {
    id: 0,
    name: '',
    type: ''
};

const ERROR_DEFAULT = { 
    name: '',
    type: ''
};

const initialState = {
    payCalendar: PAY_CALENDAR_DEFAULT_PROPS,
    payCalendars: [],
    isLoading: false,
    error: ERROR_DEFAULT
}

export default (state = initialState, { type, payload }) => 
{
    const {
        payCalendars
    } = state;

    switch (type) 
    {
        case GET_PAY_CALENDARS_START:
        case CREATE_PAY_CALENDAR_START:
        case UPDATE_PAY_CALENDAR_START:
        case DESTROY_PAY_CALENDARS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_PAY_CALENDARS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                payCalendars: payload.payCalendars,
                error: ERROR_DEFAULT
            };

        case GET_PAY_CALENDARS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_PAY_CALENDAR_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_PAY_CALENDAR_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_PAY_CALENDAR_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_PAY_CALENDAR_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_PAY_CALENDARS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                payCalendars: payCalendars.filter(({ id }) => !payload.ids.includes(id)),
                error: ERROR_DEFAULT
            };

        case DESTROY_PAY_CALENDARS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
