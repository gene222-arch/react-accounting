import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { 
    fetchAllAsync, 
    createAsync, 
    mailAsync,
    markAsPaidAsync,
    markAsReceivedAsync,
    paymentAsync,
    updateAsync, 
    cancelAsync,
    destroyAsync 
} from '../../../services/purchases/bill';

/** Actions */
import { 
    getBillsSuccess, 
    getBillsFailed, 
    createBillSuccess, 
    createBillFailed, 
    mailVendorSuccess,
    mailVendorFailed,
    markAsPaidSuccess,
    markAsPaidFailed,
    markAsReceivedSuccess,
    markAsReceivedFailed,
    paymentSuccess,
    paymentFailed,
    updateBillSuccess, 
    updateBillFailed,
    cancelBillSuccess,
    cancelBillFailed,
    destroyBillsSuccess, 
    destroyBillsFailed, 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_BILLS_START,
    CREATE_BILL_START,
    MAIL_VENDOR_START,
    MARK_BILL_AS_PAID_START,
    MARK_BILL_AS_RECEIVED_START,
    BILL_PAYMENT_START,
    UPDATE_BILL_START,
    CANCEL_BILL_START,
    DESTROY_BILLS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchBillsSaga (payload)
{
    try {
        const { status, message, data } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {

            const bills = data.map(bill => ({
                ...bill,
                amount_due: bill.payment_detail.amount_due,
                vendor: bill.vendor.name
            }));

            yield put(getBillsSuccess({ bills }));
        }

    } catch ({ message }) {
        yield put(getBillsFailed({ errorMessages: message }));
    }
}


function* createBillSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createBillSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.BILL));
        }

    } catch ({ message }) {
        yield put(createBillFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* mailVendorSaga (payload)
{
    try {
        const { data, message, status } = yield call(mailAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(mailVendorSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(mailVendorFailed({
            status: 'error',
            errorMessages: message
        }));
    }
}

function* markAsPaidSaga (payload)
{
    try {
        const { data, message, status } = yield call(markAsPaidAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(markAsPaidSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(markAsPaidFailed({
            status: 'error',
            errorMessages: message
        }));
    }
}

function* markAsReceivedSaga (payload)
{
    try {
        const { data, message, status } = yield call(markAsReceivedAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(markAsReceivedSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(markAsReceivedFailed({
            status: 'error',
            errorMessages: message
        }));
    }
}

function* paymentSaga (payload)
{
    try {
        const { data, message, status } = yield call(paymentAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(paymentSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(paymentFailed({
            status: 'error',
            errorMessages: message
        }));
    }
}

function* updateBillSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateBillSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.BILL));
        }

    } catch ({ message }) {
        yield put(updateBillFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* cancelBillSaga (payload)
{
    try {
        const { message, status } = yield call(cancelAsync, payload);

        yield put(cancelBillSuccess());

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(cancelBillFailed({ 
            status: 'error',
            errorMessages: message 
        }));
    }
}

function* destroyBillsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyBillsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyBillsFailed({ 
            status: 'error',
            errorMessages: message 
        }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchBillsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_BILLS_START);

        yield call(fetchBillsSaga, payload);
    }
}

function* createBillWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_BILL_START);

        yield call(createBillSaga, payload);
    }
}

function* mailVendorWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MAIL_VENDOR_START);

        yield call(mailVendorSaga, payload);
    }
}

function* markAsPaidWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MARK_BILL_AS_PAID_START);

        yield call(markAsPaidSaga, payload);
    }
}

function* markAsReceivedWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MARK_BILL_AS_RECEIVED_START);

        yield call(markAsReceivedSaga, payload);
    }
}

function* paymentWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(BILL_PAYMENT_START);

        yield call(paymentSaga, payload);
    }
}

function* updateBillWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_BILL_START);

        yield call(updateBillSaga, payload);
    }
}

function* cancelBillWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CANCEL_BILL_START);

        yield call(cancelBillSaga, payload);
    }
}

function* destroyBillsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_BILLS_START);

        yield call(destroyBillsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchBillsWatcher(),
        createBillWatcher(),
        mailVendorWatcher(),
        markAsPaidWatcher(),
        markAsReceivedWatcher(),
        paymentWatcher(),
        updateBillWatcher(),
        cancelBillWatcher(),
        destroyBillsWatcher()
    ]);
 }