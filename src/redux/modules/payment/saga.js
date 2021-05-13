import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/purchases/payment';

/** Actions */
import { 
    getPaymentsSuccess, 
    getPaymentsFailed, 
    destroyPaymentsSuccess, 
    destroyPaymentsFailed, 
    createPaymentSuccess, 
    createPaymentFailed, 
    updatePaymentSuccess, 
    updatePaymentFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_PAYMENTS_START,
    CREATE_PAYMENT_START,
    UPDATE_PAYMENT_START,
    DESTROY_PAYMENTS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchPaymentsSaga ()
{
    try {
        const { status, message, data } = yield call(fetchAllAsync);

        if (status !== 'success') {
        }

        if (status === 'success') {

            const payments = data.map(({ vendor, expense_category, account, ...payments }) => ({
                ...payments,
                vendor: vendor.name,
                category: expense_category.name,
                account: account.name
            }));

            yield put(getPaymentsSuccess({ payments }));
        }

    } catch ({ message }) {
        yield put(getPaymentsFailed({ errorMessages: message }));
    }
}


function* createPaymentSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createPaymentSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAYMENT));
        }

    } catch ({ message }) {
        yield put(createPaymentFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updatePaymentSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updatePaymentSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAYMENT));
        }

    } catch ({ message }) {
        yield put(updatePaymentFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyPaymentsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyPaymentsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyPaymentsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchPaymentsWatcher ()
{
    while (true) 
    {
        yield take(GET_PAYMENTS_START);

        yield call(fetchPaymentsSaga);
    }
}

function* createPaymentWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_PAYMENT_START);

        yield call(createPaymentSaga, payload);
    }
}

function* updatePaymentWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_PAYMENT_START);

        yield call(updatePaymentSaga, payload);
    }
}

function* destroyPaymentsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_PAYMENTS_START);

        yield call(destroyPaymentsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchPaymentsWatcher(),
        createPaymentWatcher(),
        updatePaymentWatcher(),
        destroyPaymentsWatcher()
    ]);
 }