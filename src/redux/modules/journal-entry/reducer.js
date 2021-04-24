import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const 
{
    GET_JOURNAL_ENTRIES_START,
    GET_JOURNAL_ENTRIES_SUCCESS,
    GET_JOURNAL_ENTRIES_FAILED,

    CREATE_JOURNAL_ENTRY_START,
    CREATE_JOURNAL_ENTRY_SUCCESS,
    CREATE_JOURNAL_ENTRY_FAILED,

    UPDATE_JOURNAL_ENTRY_START,
    UPDATE_JOURNAL_ENTRY_SUCCESS,
    UPDATE_JOURNAL_ENTRY_FAILED,

    DESTROY_JOURNAL_ENTRIES_START,
    DESTROY_JOURNAL_ENTRIES_SUCCESS,
    DESTROY_JOURNAL_ENTRIES_FAILED
} = ACTION_TYPES;

const JOURNAL_ENTRY_DEFAULT_PROPS = {
    id: 0,
    date: DATE.today(),
    reference: '',
    description: ''
};

const ERROR_DEFAULT_PROPS = {
    date: '',
    reference: '',
    description: '',
};

const initialState = {
    isLoading: false,
    journalEntry: JOURNAL_ENTRY_DEFAULT_PROPS,
    journalEntries: [],
    error: ERROR_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) => 
{
    const {
        isLoading,
        journalEntry,
        journalEntries,
        error
    } = state;

    switch (type) {

        case GET_JOURNAL_ENTRIES_START:
        case CREATE_JOURNAL_ENTRY_START:
        case UPDATE_JOURNAL_ENTRY_START:
        case DESTROY_JOURNAL_ENTRIES_START:
            return { 
                ...state, 
                isLoading: true,
            };

        case GET_JOURNAL_ENTRIES_SUCCESS:
            return { 
                ...state, 
                isLoading: false,
                journalEntries: payload.journalEntries,
                error: ERROR_DEFAULT_PROPS,
            };
        
        case GET_JOURNAL_ENTRIES_FAILED:
            return { 
                ...state, 
                isLoading: false,
                error: payload.errorMessages
            };

        case CREATE_JOURNAL_ENTRY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT_PROPS
            };

        case CREATE_JOURNAL_ENTRY_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_JOURNAL_ENTRY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT_PROPS
            };
            
        case UPDATE_JOURNAL_ENTRY_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case DESTROY_JOURNAL_ENTRIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                journalEntries: journalEntries.filter(journalEntry => !payload.ids.includes(journalEntry.id)),
                error: ERROR_DEFAULT_PROPS
            };
            
        case DESTROY_JOURNAL_ENTRIES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        default:
            return state
    }
}

