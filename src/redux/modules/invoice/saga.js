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
    paymentAsync,
    updateAsync, 
    cancelAsync,
    destroyAsync 
} from '../../../services/sales/invoice';

/** Actions */
import { 
    getInvoicesSuccess, 
    getInvoicesFailed, 
    createInvoiceSuccess, 
    createInvoiceFailed, 
    mailCustomerSuccess,
    mailCustomerFailed,
    markAsPaidSuccess,
    markAsPaidFailed,
    paymentSuccess,
    paymentFailed,
    updateInvoiceSuccess, 
    updateInvoiceFailed,
    cancelInvoiceSuccess,
    cancelInvoiceFailed,
    destroyInvoicesSuccess, 
    destroyInvoicesFailed, 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_INVOICES_START,
    CREATE_INVOICE_START,
    MAIL_CUSTOMER_START,
    MARK_AS_PAID_START,
    PAYMENT_START,
    UPDATE_INVOICE_START,
    CANCEL_INVOICE_START,
    DESTROY_INVOICES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchInvoicesSaga (payload)
{
    try {
        const { status, message, data } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {

            const invoices = data.map(invoice => ({
                ...invoice,
                amount_due: invoice.payment_detail.amount_due,
                customer: invoice.customer.name
            }));

            yield put(getInvoicesSuccess({ invoices }));
        }

    } catch ({ message }) {
        yield put(getInvoicesFailed({ errorMessages: message }));
    }
}


function* createInvoiceSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createInvoiceSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.INVOICE));
        }

    } catch ({ message }) {
        yield put(createInvoiceFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* mailCustomerSaga (payload)
{
    try {
        const { data, message, status } = yield call(mailAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(mailCustomerSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(mailCustomerFailed({
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

function* updateInvoiceSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateInvoiceSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.INVOICE));
        }

    } catch ({ message }) {
        yield put(updateInvoiceFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* cancelInvoiceSaga (payload)
{
    try {
        const { message, status } = yield call(cancelAsync, payload);

        yield put(cancelInvoiceSuccess());

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(cancelInvoiceFailed({ 
            status: 'error',
            errorMessages: message 
        }));
    }
}

function* destroyInvoicesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyInvoicesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyInvoicesFailed({ 
            status: 'error',
            errorMessages: message 
        }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchInvoicesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_INVOICES_START);

        yield call(fetchInvoicesSaga, payload);
    }
}

function* createInvoiceWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_INVOICE_START);

        yield call(createInvoiceSaga, payload);
    }
}

function* mailCustomerWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MAIL_CUSTOMER_START);

        yield call(mailCustomerSaga, payload);
    }
}

function* markAsPaidWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MARK_AS_PAID_START);

        yield call(markAsPaidSaga, payload);
    }
}

function* paymentWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(PAYMENT_START);

        yield call(paymentSaga, payload);
    }
}

function* updateInvoiceWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_INVOICE_START);

        yield call(updateInvoiceSaga, payload);
    }
}

function* cancelInvoiceWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CANCEL_INVOICE_START);

        yield call(cancelInvoiceSaga, payload);
    }
}

function* destroyInvoicesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_INVOICES_START);

        yield call(destroyInvoicesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchInvoicesWatcher(),
        createInvoiceWatcher(),
        mailCustomerWatcher(),
        markAsPaidWatcher(),
        paymentWatcher(),
        updateInvoiceWatcher(),
        cancelInvoiceWatcher(),
        destroyInvoicesWatcher()
    ]);
 }