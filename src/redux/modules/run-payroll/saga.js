import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, approveAsync, updateAsync, destroyAsync } from '../../../services/payroll/run.payroll';

/** Actions */
import { 
    getRunPayrollsSuccess, 
    getRunPayrollsFailed, 
    destroyRunPayrollsSuccess, 
    destroyRunPayrollsFailed, 
    createRunPayrollSuccess, 
    createRunPayrollFailed, 
    approveRunPayrollSuccess,
    approveRunPayrollFailed,
    updateRunPayrollSuccess, 
    updateRunPayrollFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_RUN_PAYROLLS_START,
    CREATE_RUN_PAYROLL_START,
    APPROVE_RUN_PAYROLL_START,
    UPDATE_RUN_PAYROLL_START,
    DESTROY_RUN_PAYROLLS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchRunPayrollsSaga (payload)
{
    try {
        const { status, message, data: runPayrolls } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getRunPayrollsSuccess({ runPayrolls }));
        }

    } catch ({ message }) {
        yield put(getRunPayrollsFailed({ errorMessages: message }));
    }
}


function* createRunPayrollSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createRunPayrollSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.RUN_PAYROLL));
        }

    } catch ({ message }) {

        yield put(createRunPayrollFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* approveRunPayrollSaga (payload)
{
    try {
        const { status, message, data } = yield call(approveAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(approveRunPayrollSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.RUN_PAYROLL));
        }

    } catch ({ message }) {
        yield put(approveRunPayrollFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* updateRunPayrollSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateRunPayrollSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.RUN_PAYROLL));
        }

    } catch ({ message }) {
        yield put(updateRunPayrollFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyRunPayrollsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyRunPayrollsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyRunPayrollsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchRunPayrollsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_RUN_PAYROLLS_START);

        yield call(fetchRunPayrollsSaga, payload);
    }
}

function* createRunPayrollWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_RUN_PAYROLL_START);

        yield call(createRunPayrollSaga, payload);
    }
}

function* approveRunPayrollWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(APPROVE_RUN_PAYROLL_START);

        yield call(approveRunPayrollSaga, payload);
    }
}


function* updateRunPayrollWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_RUN_PAYROLL_START);

        yield call(updateRunPayrollSaga, payload);
    }
}

function* destroyRunPayrollsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_RUN_PAYROLLS_START);

        yield call(destroyRunPayrollsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchRunPayrollsWatcher(),
        createRunPayrollWatcher(),
        approveRunPayrollWatcher(),
        updateRunPayrollWatcher(),
        destroyRunPayrollsWatcher()
    ]);
 }