import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/sales/customer';

/** Actions */
import { 
    getCustomersSuccess, 
    getCustomersFailed, 
    destroyCustomersSuccess, 
    destroyCustomersFailed, 
    createCustomerSuccess, 
    createCustomerFailed, 
    updateCustomerSuccess, 
    updateCustomerFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_CUSTOMERS_START,
    CREATE_CUSTOMER_START,
    UPDATE_CUSTOMER_START,
    DESTROY_CUSTOMERS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchCustomersSaga (payload)
{
    try {
        const { status, message, data: customers } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getCustomersSuccess({ customers }));
        }

    } catch ({ message }) {
        yield put(getCustomersFailed({ errorMessages: message }));
    }
}


function* createCustomerSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createCustomerSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CUSTOMER));
        }

    } catch ({ message }) {
        yield put(createCustomerFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateCustomerSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateCustomerSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CUSTOMER));
        }

    } catch ({ message }) {
        yield put(updateCustomerFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyCustomersSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyCustomersSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyCustomersFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchCustomersWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_CUSTOMERS_START);

        yield call(fetchCustomersSaga, payload);
    }
}

function* createCustomerWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_CUSTOMER_START);

        yield call(createCustomerSaga, payload);
    }
}

function* updateCustomerWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_CUSTOMER_START);

        yield call(updateCustomerSaga, payload);
    }
}

function* destroyCustomersWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_CUSTOMERS_START);

        yield call(destroyCustomersSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchCustomersWatcher(),
        createCustomerWatcher(),
        updateCustomerWatcher(),
        destroyCustomersWatcher()
    ]);
 }