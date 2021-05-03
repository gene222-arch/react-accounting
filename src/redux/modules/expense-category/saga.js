import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/settings/expense.category';

/** Actions */
import { 
    getExpenseCategoriesSuccess, 
    getExpenseCategoriesFailed, 
    destroyExpenseCategoriesSuccess, 
    destroyExpenseCategoriesFailed, 
    createExpenseCategorySuccess, 
    createExpenseCategoryFailed, 
    updateExpenseCategorySuccess, 
    updateExpenseCategoryFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_EXPENSE_CATEGORIES_START,
    CREATE_EXPENSE_CATEGORY_START,
    UPDATE_EXPENSE_CATEGORY_START,
    DESTROY_EXPENSE_CATEGORIES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchExpenseCategoriesSaga (payload)
{
    try {
        const { status, message, data: expenseCategories } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getExpenseCategoriesSuccess({ expenseCategories }));
        }

    } catch ({ message }) {
        yield put(getExpenseCategoriesFailed({ errorMessages: message }));
    }
}


function* createExpenseCategorySaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createExpenseCategorySuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.EXPENSE_CATEGORY));
        }

    } catch ({ message }) {
        yield put(createExpenseCategoryFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateExpenseCategorySaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateExpenseCategorySuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.EXPENSE_CATEGORY));
        }

    } catch ({ message }) {
        yield put(updateExpenseCategoryFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyExpenseCategoriesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyExpenseCategoriesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyExpenseCategoriesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchExpenseCategoriesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_EXPENSE_CATEGORIES_START);

        yield call(fetchExpenseCategoriesSaga, payload);
    }
}

function* createExpenseCategoryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_EXPENSE_CATEGORY_START);

        yield call(createExpenseCategorySaga, payload);
    }
}

function* updateExpenseCategoryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_EXPENSE_CATEGORY_START);

        yield call(updateExpenseCategorySaga, payload);
    }
}

function* destroyExpenseCategoriesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_EXPENSE_CATEGORIES_START);

        yield call(destroyExpenseCategoriesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchExpenseCategoriesWatcher(),
        createExpenseCategoryWatcher(),
        updateExpenseCategoryWatcher(),
        destroyExpenseCategoriesWatcher()
    ]);
 }