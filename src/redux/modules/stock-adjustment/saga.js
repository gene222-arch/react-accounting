import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/inventory/stock.adjustment';

/** Actions */
import { 
    getStockAdjustmentsSuccess, 
    getStockAdjustmentsFailed, 
    destroyStockAdjustmentsSuccess, 
    destroyStockAdjustmentsFailed, 
    createStockAdjustmentSuccess, 
    createStockAdjustmentFailed, 
    updateStockAdjustmentSuccess, 
    updateStockAdjustmentFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_STOCK_ADJUSTMENTS_START,
    CREATE_STOCK_ADJUSTMENT_START,
    UPDATE_STOCK_ADJUSTMENT_START,
    DESTROY_STOCK_ADJUSTMENTS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchStockAdjustmentsSaga (payload)
{
    try {
        const { status, message, data: stockAdjustments } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
            yield put(getStockAdjustmentsSuccess({ stockAdjustments: [] }));
        }

        if (status === 'success') {
            yield put(getStockAdjustmentsSuccess({ stockAdjustments }));
        }

    } catch ({ message }) {
        yield put(getStockAdjustmentsFailed({ errorMessages: message }));
    }
}


function* createStockAdjustmentSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createStockAdjustmentSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.STOCK_ADJUSTMENT));
        }

    } catch ({ message }) {
        yield put(createStockAdjustmentFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateStockAdjustmentSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateStockAdjustmentSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.STOCK_ADJUSTMENT));
        }

    } catch ({ message }) {
        yield put(updateStockAdjustmentFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyStockAdjustmentsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyStockAdjustmentsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyStockAdjustmentsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchStockAdjustmentsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_STOCK_ADJUSTMENTS_START);

        yield call(fetchStockAdjustmentsSaga, payload);
    }
}

function* createStockAdjustmentWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_STOCK_ADJUSTMENT_START);

        yield call(createStockAdjustmentSaga, payload);
    }
}

function* updateStockAdjustmentWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_STOCK_ADJUSTMENT_START);

        yield call(updateStockAdjustmentSaga, payload);
    }
}

function* destroyStockAdjustmentsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_STOCK_ADJUSTMENTS_START);

        yield call(destroyStockAdjustmentsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchStockAdjustmentsWatcher(),
        createStockAdjustmentWatcher(),
        updateStockAdjustmentWatcher(),
        destroyStockAdjustmentsWatcher()
    ]);
 }