import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/inventory/warehouse';

/** Actions */
import { 
    getWarehousesSuccess, 
    getWarehousesFailed, 
    destroyWarehousesSuccess, 
    destroyWarehousesFailed, 
    createWarehouseSuccess, 
    createWarehouseFailed, 
    updateWarehouseSuccess, 
    updateWarehouseFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_WAREHOUSES_START,
    CREATE_WAREHOUSE_START,
    UPDATE_WAREHOUSE_START,
    DESTROY_WAREHOUSES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchWarehousesSaga (payload)
{
    try {
        const { status, message, data: warehouses } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
            yield put(getWarehousesSuccess({ warehouses: [] }));
        }

        if (status === 'success') {
            yield put(getWarehousesSuccess({ warehouses }));
        }

    } catch ({ message }) {
        yield put(getWarehousesFailed({ errorMessages: message }));
    }
}


function* createWarehouseSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createWarehouseSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.WAREHOUSE));
        }

    } catch ({ message }) {
        yield put(createWarehouseFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateWarehouseSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateWarehouseSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.WAREHOUSE));
        }

    } catch ({ message }) {
        yield put(updateWarehouseFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyWarehousesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyWarehousesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyWarehousesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchWarehousesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_WAREHOUSES_START);

        yield call(fetchWarehousesSaga, payload);
    }
}

function* createWarehouseWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_WAREHOUSE_START);

        yield call(createWarehouseSaga, payload);
    }
}

function* updateWarehouseWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_WAREHOUSE_START);

        yield call(updateWarehouseSaga, payload);
    }
}

function* destroyWarehousesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_WAREHOUSES_START);

        yield call(destroyWarehousesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchWarehousesWatcher(),
        createWarehouseWatcher(),
        updateWarehouseWatcher(),
        destroyWarehousesWatcher()
    ]);
 }