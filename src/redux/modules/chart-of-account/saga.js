import { put, take, call, all } from 'redux-saga/effects';
import {  push } from 'connected-react-router'
/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/double-entry/chart.of.account';

/** Actions */
import { 
    getChartOfAccountsSuccess, 
    getChartOfAccountsFailed, 
    destroyChartOfAccountsSuccess, 
    destroyChartOfAccountsFailed, 
    createChartOfAccountSuccess, 
    createChartOfAccountFailed, 
    updateChartOfAccountSuccess, 
    updateChartOfAccountFailed
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_CHART_OF_ACCOUNTS_START,
    CREATE_CHART_OF_ACCOUNT_START,
    UPDATE_CHART_OF_ACCOUNT_START,
    DESTROY_CHART_OF_ACCOUNTS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchChartOfAccountsSaga (payload)
{
    try {
        const { status, message, data } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') 
        {
            const chartOfAccounts = data.map(chartOfAccount => ({
                ...chartOfAccount,
                description: chartOfAccount.description !== 'NULL' ? chartOfAccount.description : '',
                type: chartOfAccount.type.name
            }));

            yield put(getChartOfAccountsSuccess({ chartOfAccounts }));
        }

    } catch ({ message }) {
        yield put(getChartOfAccountsFailed({ errorMessages: message }));
    }
}


function* createChartOfAccountSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createChartOfAccountSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CHART_OF_ACCOUNT));
        }

    } catch ({ message }) {
        yield put(createChartOfAccountFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateChartOfAccountSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateChartOfAccountSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CHART_OF_ACCOUNT));
        }

    } catch ({ message }) {
        yield put(updateChartOfAccountFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyChartOfAccountsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyChartOfAccountsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyChartOfAccountsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchChartOfAccountsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_CHART_OF_ACCOUNTS_START);

        yield call(fetchChartOfAccountsSaga, payload);
    }
}

function* createChartOfAccountWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_CHART_OF_ACCOUNT_START);

        yield call(createChartOfAccountSaga, payload);
    }
}

function* updateChartOfAccountWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_CHART_OF_ACCOUNT_START);

        yield call(updateChartOfAccountSaga, payload);
    }
}

function* destroyChartOfAccountsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_CHART_OF_ACCOUNTS_START);

        yield call(destroyChartOfAccountsSaga, payload);
    }
}


/**
 * 
 */
export default function* ()
{
    yield all([
        fetchChartOfAccountsWatcher(),
        createChartOfAccountWatcher(),
        updateChartOfAccountWatcher(),
        destroyChartOfAccountsWatcher()
    ]);
}

