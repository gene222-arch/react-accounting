import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/purchases/vendor';

/** Actions */
import { 
    getVendorsSuccess, 
    getVendorsFailed, 
    destroyVendorsSuccess, 
    destroyVendorsFailed, 
    createVendorSuccess, 
    createVendorFailed, 
    updateVendorSuccess, 
    updateVendorFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_VENDORS_START,
    CREATE_VENDOR_START,
    UPDATE_VENDOR_START,
    DESTROY_VENDORS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchVendorsSaga (payload)
{
    try {
        const { status, message, data: vendors } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getVendorsSuccess({ vendors }));
        }

    } catch ({ message }) {
        yield put(getVendorsFailed({ errorMessages: message }));
    }
}


function* createVendorSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createVendorSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.VENDOR));
        }

    } catch ({ message }) {
        yield put(createVendorFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateVendorSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateVendorSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.VENDOR));
        }

    } catch ({ message }) {
        yield put(updateVendorFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyVendorsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyVendorsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyVendorsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchVendorsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_VENDORS_START);

        yield call(fetchVendorsSaga, payload);
    }
}

function* createVendorWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_VENDOR_START);

        yield call(createVendorSaga, payload);
    }
}

function* updateVendorWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_VENDOR_START);

        yield call(updateVendorSaga, payload);
    }
}

function* destroyVendorsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_VENDORS_START);

        yield call(destroyVendorsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchVendorsWatcher(),
        createVendorWatcher(),
        updateVendorWatcher(),
        destroyVendorsWatcher()
    ]);
 }