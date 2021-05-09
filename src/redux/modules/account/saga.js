import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/banking/account.js';

/** Actions */
import { 
    getAccountsSuccess, 
    getAccountsFailed, 
    destroyAccountsSuccess, 
    destroyAccountsFailed, 
    createAccountSuccess, 
    createAccountFailed, 
    updateAccountSuccess, 
    updateAccountFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_ACCOUNTS_START,
    CREATE_ACCOUNT_START,
    UPDATE_ACCOUNT_START,
    DESTROY_ACCOUNTS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchAccountsSaga (payload)
{
    try {
        const { status, message, data: accounts } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getAccountsSuccess({ accounts }));
        }

    } catch ({ message }) {
        yield put(getAccountsFailed({ errorMessages: message }));
    }
}


function* createAccountSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createAccountSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ACCOUNT));
        }

    } catch ({ message }) {
        yield put(createAccountFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateAccountSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateAccountSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ACCOUNT));
        }

    } catch ({ message }) {
        yield put(updateAccountFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyAccountsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyAccountsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyAccountsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchAccountsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_ACCOUNTS_START);

        yield call(fetchAccountsSaga, payload);
    }
}

function* createAccountWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_ACCOUNT_START);

        yield call(createAccountSaga, payload);
    }
}

function* updateAccountWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_ACCOUNT_START);

        yield call(updateAccountSaga, payload);
    }
}

function* destroyAccountsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_ACCOUNTS_START);

        yield call(destroyAccountsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchAccountsWatcher(),
        createAccountWatcher(),
        updateAccountWatcher(),
        destroyAccountsWatcher()
    ]);
 }