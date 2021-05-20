import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/payroll/pay.calendar';

/** Actions */
import { 
    getPayCalendarsSuccess, 
    getPayCalendarsFailed, 
    destroyPayCalendarsSuccess, 
    destroyPayCalendarsFailed, 
    createPayCalendarSuccess, 
    createPayCalendarFailed, 
    updatePayCalendarSuccess, 
    updatePayCalendarFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_PAY_CALENDARS_START,
    CREATE_PAY_CALENDAR_START,
    UPDATE_PAY_CALENDAR_START,
    DESTROY_PAY_CALENDARS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchPayCalendarsSaga (payload)
{
    try {
        const { status, message, data } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {

            const payCalendars = data.map(({ payroll, ...payCalendar }) => ({
                ...payCalendar,
                payroll_id: payroll?.id ?? 0
            }));

            yield put(getPayCalendarsSuccess({ payCalendars }));
        }

    } catch ({ message }) {
        yield put(getPayCalendarsFailed({ errorMessages: message }));
    }
}


function* createPayCalendarSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createPayCalendarSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAY_CALENDAR));
        }

    } catch ({ message }) {

        yield put(createPayCalendarFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updatePayCalendarSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updatePayCalendarSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.PAY_CALENDAR));
        }

    } catch ({ message }) {
        yield put(updatePayCalendarFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyPayCalendarsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyPayCalendarsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyPayCalendarsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchPayCalendarsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_PAY_CALENDARS_START);

        yield call(fetchPayCalendarsSaga, payload);
    }
}

function* createPayCalendarWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_PAY_CALENDAR_START);

        yield call(createPayCalendarSaga, payload);
    }
}

function* updatePayCalendarWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_PAY_CALENDAR_START);

        yield call(updatePayCalendarSaga, payload);
    }
}

function* destroyPayCalendarsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_PAY_CALENDARS_START);

        yield call(destroyPayCalendarsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchPayCalendarsWatcher(),
        createPayCalendarWatcher(),
        updatePayCalendarWatcher(),
        destroyPayCalendarsWatcher()
    ]);
 }