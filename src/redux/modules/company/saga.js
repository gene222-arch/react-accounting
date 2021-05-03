import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { createAsync, updateAsync, destroyAsync } from '../../../services/settings/company.js';

/** Actions */
import { 
    destroyCompaniesSuccess, 
    destroyCompaniesFailed, 
    createCompanySuccess, 
    createCompanyFailed, 
    updateCompanySuccess, 
    updateCompanyFailed 
} from './actions';
import * as AUTH from '../auth/actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    CREATE_COMPANY_START,
    UPDATE_COMPANY_START,
    DESTROY_COMPANIES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* createCompanySaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createCompanySuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(createCompanyFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateCompanySaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateCompanySuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(AUTH.authUser());
        }

    } catch ({ message }) {
        yield put(updateCompanyFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyCompaniesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyCompaniesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyCompaniesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* createCompanyWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_COMPANY_START);

        yield call(createCompanySaga, payload);
    }
}

function* updateCompanyWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_COMPANY_START);

        yield call(updateCompanySaga, payload);
    }
}

function* destroyCompaniesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_COMPANIES_START);

        yield call(destroyCompaniesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        createCompanyWatcher(),
        updateCompanyWatcher(),
        destroyCompaniesWatcher()
    ]);
 }