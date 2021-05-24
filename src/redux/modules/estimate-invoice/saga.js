import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { 
    fetchAllAsync, 
    createAsync, 
    convertToInvoiceAsync,
    mailAsync,
    markAsApprovedAsync,
    markAsRefusedAsync,
    updateAsync, 
    destroyAsync 
} from '../../../services/sales/estimate.invoice';

/** Actions */
import { 
    getEstimateInvoicesSuccess, 
    getEstimateInvoicesFailed, 
    createEstimateInvoiceSuccess, 
    createEstimateInvoiceFailed, 
    convertToInvoiceSuccess,
    convertToInvoiceFailed,
    mailEstimateInvoiceCustomerSuccess,
    mailEstimateInvoiceCustomerFailed,
    markAsApprovedSuccess,
    markAsApprovedFailed,
    markAsRefusedSuccess,
    markAsRefusedFailed,
    updateEstimateInvoiceSuccess, 
    updateEstimateInvoiceFailed,
    destroyEstimateInvoicesSuccess, 
    destroyEstimateInvoicesFailed, 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_ESTIMATE_INVOICES_START,
    CREATE_ESTIMATE_INVOICE_START,
    CONVERT_TO_INVOICE_START,
    MAIL_ESTIMATE_INVOICE_CUSTOMER_START,
    MARK_ESTIMATE_INVOICE_AS_APPROVED_START,
    MARK_ESTIMATE_INVOICE_AS_REFUSED_START,
    UPDATE_ESTIMATE_INVOICE_START,
    DESTROY_ESTIMATE_INVOICES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchEstimateInvoicesSaga (payload)
{
    try {
        const { status, message, data } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {

            const estimateInvoices = data.map(estimateInvoice => ({
                ...estimateInvoice,
                total: estimateInvoice.payment_detail.total,
                customer: estimateInvoice.customer.name
            }));

            console.log(data)

            yield put(getEstimateInvoicesSuccess({ estimateInvoices }));
        }

    } catch ({ message }) {
        yield put(getEstimateInvoicesFailed({ errorMessages: message }));
    }
}


function* createEstimateInvoiceSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createEstimateInvoiceSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ESTIMATE_INVOICE));
        }

    } catch ({ message }) {
        yield put(createEstimateInvoiceFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* convertToInvoiceSaga (payload)
{
    try {
        const { status, message, data } = yield call(convertToInvoiceAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(convertToInvoiceSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ESTIMATE_INVOICE));
        }

    } catch ({ message }) {
        yield put(convertToInvoiceFailed({ errorMessages: message }));

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
            yield put(mailEstimateInvoiceCustomerSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(mailEstimateInvoiceCustomerFailed({
            status: 'error',
            errorMessages: message
        }));
    }
}

function* markAsApprovedSaga (payload)
{
    try {
        const { data, message, status } = yield call(markAsApprovedAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(markAsApprovedSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(markAsApprovedFailed({
            status: 'error',
            errorMessages: message
        }));
    }
}

function* markAsRefusedSaga (payload)
{
    try {
        const { data, message, status } = yield call(markAsRefusedAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(markAsRefusedSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(markAsRefusedFailed({
            status: 'error',
            errorMessages: message
        }));
    }
}

function* updateEstimateInvoiceSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateEstimateInvoiceSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ESTIMATE_INVOICE));
        }

    } catch ({ message }) {
        yield put(updateEstimateInvoiceFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyEstimateInvoicesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyEstimateInvoicesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyEstimateInvoicesFailed({ 
            status: 'error',
            errorMessages: message 
        }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchEstimateInvoicesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_ESTIMATE_INVOICES_START);

        yield call(fetchEstimateInvoicesSaga, payload);
    }
}

function* createEstimateInvoiceWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_ESTIMATE_INVOICE_START);

        yield call(createEstimateInvoiceSaga, payload);
    }
}

function* convertToInvoiceWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CONVERT_TO_INVOICE_START);

        yield call(convertToInvoiceSaga, payload);
    }
}

function* mailCustomerWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MAIL_ESTIMATE_INVOICE_CUSTOMER_START);

        yield call(mailCustomerSaga, payload);
    }
}

function* markAsApprovedWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MARK_ESTIMATE_INVOICE_AS_APPROVED_START);

        yield call(markAsApprovedSaga, payload);
    }
}

function* markAsRefusedWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(MARK_ESTIMATE_INVOICE_AS_REFUSED_START);

        yield call(markAsRefusedSaga, payload);
    }
}

function* updateEstimateInvoiceWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_ESTIMATE_INVOICE_START);

        yield call(updateEstimateInvoiceSaga, payload);
    }
}

function* destroyEstimateInvoicesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_ESTIMATE_INVOICES_START);

        yield call(destroyEstimateInvoicesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchEstimateInvoicesWatcher(),
        createEstimateInvoiceWatcher(),
        convertToInvoiceWatcher(),
        mailCustomerWatcher(),
        markAsApprovedWatcher(),
        markAsRefusedWatcher(),
        updateEstimateInvoiceWatcher(),
        destroyEstimateInvoicesWatcher()
    ]);
 }