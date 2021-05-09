import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/settings/payment.method';

/** Actions */
import { 
    getPaymentMethodsSuccess, 
    getPaymentMethodsFailed, 
    destroyPaymentMethodsSuccess, 
    destroyPaymentMethodsFailed, 
    createPaymentMethodSuccess, 
    createPaymentMethodFailed, 
    updatePaymentMethodSuccess, 
    updatePaymentMethodFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_PAYMENT_METHODS_START,
    CREATE_PAYMENT_METHOD_START,
    UPDATE_PAYMENT_METHOD_START,
    DESTROY_PAYMENT_METHODS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchPaymentMethodsSaga (payload)
{
    try {
        const { status, message, data: paymentMethods } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getPaymentMethodsSuccess({ paymentMethods }));
        }

    } catch ({ message }) {
        yield put(getPaymentMethodsFailed({ errorMessages: message }));
    }
}


function* createPaymentMethodSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createPaymentMethodSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAYMENT_METHOD));
        }

    } catch ({ message }) {
        yield put(createPaymentMethodFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updatePaymentMethodSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updatePaymentMethodSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAYMENT_METHOD));
        }

    } catch ({ message }) {
        yield put(updatePaymentMethodFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyPaymentMethodsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyPaymentMethodsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyPaymentMethodsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchPaymentMethodsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_PAYMENT_METHODS_START);

        yield call(fetchPaymentMethodsSaga, payload);
    }
}

function* createPaymentMethodWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_PAYMENT_METHOD_START);

        yield call(createPaymentMethodSaga, payload);
    }
}

function* updatePaymentMethodWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_PAYMENT_METHOD_START);

        yield call(updatePaymentMethodSaga, payload);
    }
}

function* destroyPaymentMethodsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_PAYMENT_METHODS_START);

        yield call(destroyPaymentMethodsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchPaymentMethodsWatcher(),
        createPaymentMethodWatcher(),
        updatePaymentMethodWatcher(),
        destroyPaymentMethodsWatcher()
    ]);
 }