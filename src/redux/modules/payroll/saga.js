import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, approveAsync, updateAsync, destroyAsync } from '../../../services/payroll/payroll';

/** Actions */
import { 
    getPayrollsSuccess, 
    getPayrollsFailed, 
    destroyPayrollsSuccess, 
    destroyPayrollsFailed, 
    createPayrollSuccess, 
    createPayrollFailed, 
    approvePayrollSuccess,
    approvePayrollFailed,
    updatePayrollSuccess, 
    updatePayrollFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_PAYROLLS_START,
    CREATE_PAYROLL_START,
    APPROVE_PAYROLL_START,
    UPDATE_PAYROLL_START,
    DESTROY_PAYROLLS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchPayrollsSaga (payload)
{
    try {
        const { status, message, data: payrolls } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getPayrollsSuccess({ payrolls }));
        }

    } catch ({ message }) {
        yield put(getPayrollsFailed({ errorMessages: message }));
    }
}


function* createPayrollSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createPayrollSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAYROLL));
        }

    } catch ({ message }) {

        yield put(createPayrollFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* approvePayrollSaga (payload)
{
    try {
        const { status, message, data } = yield call(approveAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(approvePayrollSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAYROLL));
        }

    } catch ({ message }) {
        yield put(approvePayrollFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* updatePayrollSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updatePayrollSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAYROLL));
        }

    } catch ({ message }) {
        yield put(updatePayrollFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyPayrollsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyPayrollsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyPayrollsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchPayrollsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_PAYROLLS_START);

        yield call(fetchPayrollsSaga, payload);
    }
}

function* createPayrollWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_PAYROLL_START);

        yield call(createPayrollSaga, payload);
    }
}

function* approvePayrollWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(APPROVE_PAYROLL_START);

        yield call(approvePayrollSaga, payload);
    }
}


function* updatePayrollWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_PAYROLL_START);

        yield call(updatePayrollSaga, payload);
    }
}

function* destroyPayrollsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_PAYROLLS_START);

        yield call(destroyPayrollsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchPayrollsWatcher(),
        createPayrollWatcher(),
        approvePayrollWatcher(),
        updatePayrollWatcher(),
        destroyPayrollsWatcher()
    ]);
 }