import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/settings/salary.benefit';

/** Actions */
import { 
    getSalaryBenefitsSuccess, 
    getSalaryBenefitsFailed, 
    destroySalaryBenefitsSuccess, 
    destroySalaryBenefitsFailed, 
    createSalaryBenefitSuccess, 
    createSalaryBenefitFailed, 
    updateSalaryBenefitSuccess, 
    updateSalaryBenefitFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_SALARY_BENEFITS_START,
    CREATE_SALARY_BENEFIT_START,
    UPDATE_SALARY_BENEFIT_START,
    DESTROY_SALARY_BENEFITS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchSalaryBenefitsSaga (payload)
{
    try {
        const { status, message, data: salaryBenefits } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getSalaryBenefitsSuccess({ salaryBenefits }));
        }

    } catch ({ message }) {
        yield put(getSalaryBenefitsFailed({ errorMessages: message }));
    }
}


function* createSalaryBenefitSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createSalaryBenefitSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.SALARY_BENEFIT));
        }

    } catch ({ message }) {
        yield put(createSalaryBenefitFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateSalaryBenefitSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateSalaryBenefitSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.SALARY_BENEFIT));
        }

    } catch ({ message }) {
        yield put(updateSalaryBenefitFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroySalaryBenefitsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroySalaryBenefitsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroySalaryBenefitsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchSalaryBenefitsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_SALARY_BENEFITS_START);

        yield call(fetchSalaryBenefitsSaga, payload);
    }
}

function* createSalaryBenefitWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_SALARY_BENEFIT_START);

        yield call(createSalaryBenefitSaga, payload);
    }
}

function* updateSalaryBenefitWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_SALARY_BENEFIT_START);

        yield call(updateSalaryBenefitSaga, payload);
    }
}

function* destroySalaryBenefitsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_SALARY_BENEFITS_START);

        yield call(destroySalaryBenefitsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchSalaryBenefitsWatcher(),
        createSalaryBenefitWatcher(),
        updateSalaryBenefitWatcher(),
        destroySalaryBenefitsWatcher()
    ]);
 }