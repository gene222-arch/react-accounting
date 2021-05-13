import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/employee/employee';

/** Actions */
import { 
    getEmployeesSuccess, 
    getEmployeesFailed, 
    destroyEmployeesSuccess, 
    destroyEmployeesFailed, 
    createEmployeeSuccess, 
    createEmployeeFailed, 
    updateEmployeeSuccess, 
    updateEmployeeFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_EMPLOYEES_START,
    CREATE_EMPLOYEE_START,
    UPDATE_EMPLOYEE_START,
    DESTROY_EMPLOYEES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchEmployeesSaga (payload)
{
    try {
        const { status, message, data } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {

            const employees = data.map(({ id, first_name, last_name, email, enabled, salary }) => ({
                id,
                name: `${ first_name } ${ last_name }`,
                email,
                hired_at: salary.hired_at,
                enabled
            }))

            yield put(getEmployeesSuccess({ employees }));
        }

    } catch ({ message }) {
        yield put(getEmployeesFailed({ errorMessages: message }));
    }
}


function* createEmployeeSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createEmployeeSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.EMPLOYEE));
        }

    } catch ({ message }) {
        yield put(createEmployeeFailed({ errorMessages: {
            first_name: message['employee.first_name'],
            last_name: message['employee.last_name'],
            birth_date: message['employee.birth_date'],
            gender: message['employee.gender'],
            email: message['employee.email'],
            phone: message['employee.phone'],
            address: message['employee.address'],
            image: message['employee.image'],
            enabled: message['employee.enabled'],
            currency_id: message['salary.currency_id'],
            amount: message['salary.amount'],
            tax_number: message['salary.tax_number'],
            bank_account_number: message['salary.bank_account_number'],
            hired_at: message['salary.hired_at'],
            role_id: message.role_id,
        }}));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateEmployeeSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateEmployeeSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.EMPLOYEE));
        }

    } catch ({ message }) {
        yield put(updateEmployeeFailed({ errorMessages: {
            first_name: message['employee.first_name'],
            last_name: message['employee.last_name'],
            birth_date: message['employee.birth_date'],
            gender: message['employee.gender'],
            email: message['employee.email'],
            phone: message['employee.phone'],
            address: message['employee.address'],
            image: message['employee.image'],
            enabled: message['employee.enabled'],
            currency_id: message['salary.currency_id'],
            amount: message['salary.amount'],
            tax_number: message['salary.tax_number'],
            bank_account_number: message['salary.bank_account_number'],
            hired_at: message['salary.hired_at'],
            role_id: message.role_id,
        }}));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyEmployeesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyEmployeesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyEmployeesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchEmployeesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_EMPLOYEES_START);

        yield call(fetchEmployeesSaga, payload);
    }
}

function* createEmployeeWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_EMPLOYEE_START);

        yield call(createEmployeeSaga, payload);
    }
}

function* updateEmployeeWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_EMPLOYEE_START);

        yield call(updateEmployeeSaga, payload);
    }
}

function* destroyEmployeesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_EMPLOYEES_START);

        yield call(destroyEmployeesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchEmployeesWatcher(),
        createEmployeeWatcher(),
        updateEmployeeWatcher(),
        destroyEmployeesWatcher()
    ]);
 }