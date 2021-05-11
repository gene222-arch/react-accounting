import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, reversalOfTransactionAsync, destroyAsync } from '../../../services/banking/bank.account.transfer';

/** Actions */
import { 
    getBankAccountTransfersSuccess, 
    getBankAccountTransfersFailed, 
    createBankAccountTransferSuccess, 
    createBankAccountTransferFailed, 
    updateBankAccountTransferSuccess, 
    updateBankAccountTransferFailed,
    reverseBankAccountTransfersSuccess,
    reverseBankAccountTransfersFailed,
    destroyBankAccountTransfersSuccess, 
    destroyBankAccountTransfersFailed, 
} from './actions';
import * as ALERT from '../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from '../../../config/alertMessages';

import PATH from '../../../routes/path';

const {
    GET_BANK_ACCOUNT_TRANSFERS_START,
    CREATE_BANK_ACCOUNT_TRANSFER_START,
    UPDATE_BANK_ACCOUNT_TRANSFER_START,
    REVERSE_BANK_ACCOUNT_TRANSFERS_START,
    DESTROY_BANK_ACCOUNT_TRANSFERS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchBankAccountTransfersSaga ()
{
    try {
        const { status, message, data } = yield call(fetchAllAsync);

        if (status !== 'success') {
        }

        if (status === 'success') {
            
            const bankAccountTransfers = data.map(({ id, from, to, amount, transferred_at }) => ({
                id, 
                from: from.name, 
                to: to.name, 
                amount, 
                transferred_at
            }))

            yield put(getBankAccountTransfersSuccess({ bankAccountTransfers }));
        }

    } catch ({ message }) {
        yield put(getBankAccountTransfersFailed({ errorMessages: message }));
    }
}


function* createBankAccountTransferSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createBankAccountTransferSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.BANK_ACCOUNT_TRANSFER));
        }

    } catch ({ message }) {
        yield put(createBankAccountTransferFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateBankAccountTransferSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateBankAccountTransferSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.BANK_ACCOUNT_TRANSFER));
        }

    } catch ({ message }) {
        yield put(updateBankAccountTransferFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* reverseBankAccountTransfersSaga (payload)
{
    try {
        const { message, status } = yield call(reversalOfTransactionAsync, payload);

        yield put(reverseBankAccountTransfersSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(reverseBankAccountTransfersFailed({ errorMessages: message }));
    }
}

function* destroyBankAccountTransfersSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyBankAccountTransfersSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyBankAccountTransfersFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchBankAccountTransfersWatcher ()
{
    while (true) 
    {
        yield take(GET_BANK_ACCOUNT_TRANSFERS_START);

        yield call(fetchBankAccountTransfersSaga);
    }
}

function* createBankAccountTransferWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_BANK_ACCOUNT_TRANSFER_START);

        yield call(createBankAccountTransferSaga, payload);
    }
}

function* updateBankAccountTransferWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_BANK_ACCOUNT_TRANSFER_START);

        yield call(updateBankAccountTransferSaga, payload);
    }
}

function* reverseBankAccountTransfersWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(REVERSE_BANK_ACCOUNT_TRANSFERS_START);

        yield call(reverseBankAccountTransfersSaga, payload);
    }
}

function* destroyBankAccountTransfersWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_BANK_ACCOUNT_TRANSFERS_START);

        yield call(destroyBankAccountTransfersSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchBankAccountTransfersWatcher(),
        createBankAccountTransferWatcher(),
        updateBankAccountTransferWatcher(),
        reverseBankAccountTransfersWatcher(),
        destroyBankAccountTransfersWatcher()
    ]);
 }