import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/settings/currency.js';

/** Actions */
import { 
    getCurrenciesSuccess, 
    getCurrenciesFailed, 
    destroyCurrenciesSuccess, 
    destroyCurrenciesFailed, 
    createCurrencySuccess, 
    createCurrencyFailed, 
    updateCurrencySuccess, 
    updateCurrencyFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_CURRENCIES_START,
    CREATE_CURRENCY_START,
    UPDATE_CURRENCY_START,
    DESTROY_CURRENCIES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchCurrenciesSaga (payload)
{
    try {
        const { status, message, data: currencies } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getCurrenciesSuccess({ currencies }));
        }

    } catch ({ message }) {
        yield put(getCurrenciesFailed({ errorMessages: message }));
    }
}


function* createCurrencySaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createCurrencySuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CURRENCY));
        }

    } catch ({ message }) {
        yield put(createCurrencyFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateCurrencySaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateCurrencySuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CURRENCY));
        }

    } catch ({ message }) {
        yield put(updateCurrencyFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyCurrenciesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyCurrenciesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyCurrenciesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchCurrenciesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_CURRENCIES_START);

        yield call(fetchCurrenciesSaga, payload);
    }
}

function* createCurrencyWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_CURRENCY_START);

        yield call(createCurrencySaga, payload);
    }
}

function* updateCurrencyWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_CURRENCY_START);

        yield call(updateCurrencySaga, payload);
    }
}

function* destroyCurrenciesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_CURRENCIES_START);

        yield call(destroyCurrenciesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchCurrenciesWatcher(),
        createCurrencyWatcher(),
        updateCurrencyWatcher(),
        destroyCurrenciesWatcher()
    ]);
 }