import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/sales/revenue';

/** Actions */
import { 
    getRevenuesSuccess, 
    getRevenuesFailed, 
    destroyRevenuesSuccess, 
    destroyRevenuesFailed, 
    createRevenueSuccess, 
    createRevenueFailed, 
    updateRevenueSuccess, 
    updateRevenueFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_REVENUES_START,
    CREATE_REVENUE_START,
    UPDATE_REVENUE_START,
    DESTROY_REVENUES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchRevenuesSaga ()
{
    try {
        const { status, message, data } = yield call(fetchAllAsync);

        if (status !== 'success') {
        }

        if (status === 'success') {
            const revenues = data.map(({ customer, income_category, account, ...revenue }) => ({
                ...revenue,
                customer: customer.name,
                category: income_category.name,
                account: account.name
            }));

            yield put(getRevenuesSuccess({ revenues }));
        }

    } catch ({ message }) {
        yield put(getRevenuesFailed({ errorMessages: message }));
    }
}


function* createRevenueSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createRevenueSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.REVENUE));
        }

    } catch ({ message }) {
        yield put(createRevenueFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateRevenueSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateRevenueSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.REVENUE));
        }

    } catch ({ message }) {
        yield put(updateRevenueFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyRevenuesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyRevenuesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyRevenuesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchRevenuesWatcher ()
{
    while (true) 
    {
        yield take(GET_REVENUES_START);

        yield call(fetchRevenuesSaga);
    }
}

function* createRevenueWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_REVENUE_START);

        yield call(createRevenueSaga, payload);
    }
}

function* updateRevenueWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_REVENUE_START);

        yield call(updateRevenueSaga, payload);
    }
}

function* destroyRevenuesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_REVENUES_START);

        yield call(destroyRevenuesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchRevenuesWatcher(),
        createRevenueWatcher(),
        updateRevenueWatcher(),
        destroyRevenuesWatcher()
    ]);
 }