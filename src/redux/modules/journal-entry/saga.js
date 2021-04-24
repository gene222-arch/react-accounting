import { all, take, call, put } from 'redux-saga/effects'

import { push } from 'connected-react-router';

/** API */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from './../../../services/double-entry/journal.entry';

/** actions */
import ACTION_TYPES from './action.types';
import { 
        getJournalEntriesFailed, 
        getJournalEntriesSuccess, 
        createJournalEntrySuccess, 
        createJournalEntryFailed, 
        updateJournalEntrySuccess,
        updateJournalEntryFailed,
        destroyJournalEntriesSuccess,
        destroyJournalEntriesFailed
} from './actions';
import * as ALERT from '../alert/actions'

import PATH from './../../../routes/path';

import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE, ERROR_MESSAGE_ON_DELETE } from './../../../config/alertMessages';

const {
    GET_JOURNAL_ENTRIES_START,
    CREATE_JOURNAL_ENTRY_START,
    UPDATE_JOURNAL_ENTRY_START,
    DESTROY_JOURNAL_ENTRIES_START,
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchJournalEntriesSaga ()
{
    try {
        const { status, message, data } = yield call(fetchAllAsync);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getJournalEntriesSuccess({ journalEntries: data }));
        }

    } catch ({ message }) {
        yield put(getJournalEntriesFailed({
            errorMessage: message
        }));
    }
}

function* createJournalEntrySaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        console.log(data);

        if (status !== 'success')
        {
        }

        if (status === 'success') 
        {
            yield put(createJournalEntrySuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.JOURNAL_ENTRY));
        }

    } catch ({ message }) {
        yield put(createJournalEntryFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateJournalEntrySaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        console.log(data);

        if (status !== 'success') {
        }
        
        if (status === 'success') 
        {
            yield put(updateJournalEntrySuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.JOURNAL_ENTRY));
        }
    } catch ({ message }) {
        yield put(updateJournalEntryFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyJournalEntriesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);
        
        yield put(destroyJournalEntriesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message
        }));

    } catch ({ message }) {
        yield put(destroyJournalEntriesFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_DELETE
        }));
    }
}



/**
 * Watchers or Observers
 */

function* fetchJournalEntriesWatcher ()
{
    while (true) 
    {
        yield take(GET_JOURNAL_ENTRIES_START);

        yield call(fetchJournalEntriesSaga);
    }
}

function* createJournalEntryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_JOURNAL_ENTRY_START);

        yield call(createJournalEntrySaga, payload);
    }
}

function* updateJournalEntryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_JOURNAL_ENTRY_START);

        yield call(updateJournalEntrySaga, payload);
    }
}

function* deleteJournalEntriesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_JOURNAL_ENTRIES_START);

        yield call(destroyJournalEntriesSaga, payload);
    }
}

export default function* ()
{
    yield all([
        fetchJournalEntriesWatcher(),
        createJournalEntryWatcher(),
        updateJournalEntryWatcher(),
        deleteJournalEntriesWatcher()
    ]);
}