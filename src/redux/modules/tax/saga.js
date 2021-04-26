import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/settings/tax';

/** Actions */
import { 
    getTaxesSuccess, 
    getTaxesFailed, 
    destroyTaxesSuccess, 
    destroyTaxesFailed, 
    createTaxSuccess, 
    createTaxFailed, 
    updateTaxSuccess, 
    updateTaxFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_TAXES_START,
    CREATE_TAX_START,
    UPDATE_TAX_START,
    DESTROY_TAXES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchTaxesSaga (payload)
{
    try {
        const { status, message, data: taxes } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getTaxesSuccess({ taxes }));
        }

    } catch ({ message }) {
        yield put(getTaxesFailed({ errorMessages: message }));
    }
}


function* createTaxSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createTaxSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.TAX));
        }

    } catch ({ message }) {
        yield put(createTaxFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateTaxSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateTaxSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.TAX));
        }

    } catch ({ message }) {
        yield put(updateTaxFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyTaxesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyTaxesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyTaxesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchTaxesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_TAXES_START);

        yield call(fetchTaxesSaga, payload);
    }
}

function* createTaxWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_TAX_START);

        yield call(createTaxSaga, payload);
    }
}

function* updateTaxWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_TAX_START);

        yield call(updateTaxSaga, payload);
    }
}

function* destroyTaxesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_TAXES_START);

        yield call(destroyTaxesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchTaxesWatcher(),
        createTaxWatcher(),
        updateTaxWatcher(),
        destroyTaxesWatcher()
    ]);
 }