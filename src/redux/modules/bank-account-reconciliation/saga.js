import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/banking/bank.account.reconciliation';

/** Actions */
import { 
    getBankAccountReconciliationsSuccess, 
    getBankAccountReconciliationsFailed, 
    createBankAccountReconciliationSuccess, 
    createBankAccountReconciliationFailed, 
    updateBankAccountReconciliationSuccess, 
    updateBankAccountReconciliationFailed,
    destroyBankAccountReconciliationsSuccess, 
    destroyBankAccountReconciliationsFailed, 
} from './actions';
import * as ALERT from '../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from '../../../config/alertMessages';

import PATH from '../../../routes/path';

const {
    GET_BANK_ACCOUNT_RECONCILIATIONS_START,
    CREATE_BANK_ACCOUNT_RECONCILIATION_START,
    UPDATE_BANK_ACCOUNT_RECONCILIATION_START,
    DESTROY_BANK_ACCOUNT_RECONCILIATIONS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchBankAccountReconciliationsSaga ()
{
    try {
        const { status, message, data } = yield call(fetchAllAsync);

        if (status !== 'success') {
        }

        if (status === 'success') {

            console.log(data)
            const bankAccountReconciliations = data.map(({ id, closing_balance, account, created_at, started_at, ended_at, status }) => ({
                id, 
                created_at,
                period: `${ started_at } - ${ ended_at }`,
                account: account.name,
                closing_balance, 
                status
            }))

            yield put(getBankAccountReconciliationsSuccess({ bankAccountReconciliations }));
        }

    } catch ({ message }) {
        yield put(getBankAccountReconciliationsFailed({ errorMessages: message }));
    }
}


function* createBankAccountReconciliationSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createBankAccountReconciliationSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.BANK_ACCOUNT_RECONCILIATION));
        }

    } catch ({ message }) {
        yield put(createBankAccountReconciliationFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateBankAccountReconciliationSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateBankAccountReconciliationSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.BANK_ACCOUNT_RECONCILIATION));
        }

    } catch ({ message }) {
        yield put(updateBankAccountReconciliationFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyBankAccountReconciliationsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyBankAccountReconciliationsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyBankAccountReconciliationsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchBankAccountReconciliationsWatcher ()
{
    while (true) 
    {
        yield take(GET_BANK_ACCOUNT_RECONCILIATIONS_START);

        yield call(fetchBankAccountReconciliationsSaga);
    }
}

function* createBankAccountReconciliationWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_BANK_ACCOUNT_RECONCILIATION_START);

        yield call(createBankAccountReconciliationSaga, payload);
    }
}

function* updateBankAccountReconciliationWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_BANK_ACCOUNT_RECONCILIATION_START);

        yield call(updateBankAccountReconciliationSaga, payload);
    }
}

function* destroyBankAccountReconciliationsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_BANK_ACCOUNT_RECONCILIATIONS_START);

        yield call(destroyBankAccountReconciliationsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchBankAccountReconciliationsWatcher(),
        createBankAccountReconciliationWatcher(),
        updateBankAccountReconciliationWatcher(),
        destroyBankAccountReconciliationsWatcher()
    ]);
 }