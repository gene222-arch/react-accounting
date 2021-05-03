import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/items/discount';

/** Actions */
import { 
    getDiscountsSuccess, 
    getDiscountsFailed, 
    destroyDiscountsSuccess, 
    destroyDiscountsFailed, 
    createDiscountSuccess, 
    createDiscountFailed, 
    updateDiscountSuccess, 
    updateDiscountFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_DISCOUNTS_START,
    CREATE_DISCOUNT_START,
    UPDATE_DISCOUNT_START,
    DESTROY_DISCOUNTS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchDiscountsSaga (payload)
{
    try {
        const { status, message, data: discounts } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getDiscountsSuccess({ discounts }));
        }

    } catch ({ message }) {
        yield put(getDiscountsFailed({ errorMessages: message }));
    }
}


function* createDiscountSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createDiscountSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.DISCOUNT));
        }

    } catch ({ message }) {
        yield put(createDiscountFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateDiscountSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateDiscountSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.DISCOUNT));
        }

    } catch ({ message }) {
        yield put(updateDiscountFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyDiscountsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyDiscountsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyDiscountsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchDiscountsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_DISCOUNTS_START);

        yield call(fetchDiscountsSaga, payload);
    }
}

function* createDiscountWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_DISCOUNT_START);

        yield call(createDiscountSaga, payload);
    }
}

function* updateDiscountWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_DISCOUNT_START);

        yield call(updateDiscountSaga, payload);
    }
}

function* destroyDiscountsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_DISCOUNTS_START);

        yield call(destroyDiscountsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchDiscountsWatcher(),
        createDiscountWatcher(),
        updateDiscountWatcher(),
        destroyDiscountsWatcher()
    ]);
 }