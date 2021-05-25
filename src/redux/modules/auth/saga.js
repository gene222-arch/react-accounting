/** Libraries */
import { all, call, put, select, take } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import { loginAsync, logoutAsync } from './../../../services/auth/login';
import { registerAsync } from './../../../services/auth/register';
import { fetchAuthAsync } from './../../../services/auth/auth';
import { forgotPasswordAsync } from './../../../services/auth/forgot.password';
import { resendEmailVerificationAsync } from './../../../services/auth/resend.email.verification';
import { resetPasswordAsync } from './../../../services/auth/reset.password';
import { verifyEmailAsync } from './../../../services/auth/verify.email';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    authUserSuccess,
    authUserFailed,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    loginSuccess, 
    loginFailed, 
    registrationSuccess, 
    registrationFailed, 
    logoutSuccess,
    logoutFailed,
    resetPasswordFailed,
    resendEmailVerificationSuccess,
    resendEmailVerificationFailed,
    verifyEmailFailed,
} from './actions';
import * as ALERT from './../alert/actions';
import { resetPasswordSuccess } from './actions';

/** Auth selectors */
import { getAuth } from './selector';

/** Utils */
import * as Cookies from '../../../utils/cookies'
import PATH from './../../../routes/path';

/** Error messages */
import { ERROR_MESSAGE_ON_LOGIN, ERROR_MESSAGE_ON_REGISTER } from './../../../config/alertMessages';



/** Action types */
const { 
    AUTH_USER_START,
    FORGOT_PASSWORD_START,
    LOGIN_START,
    LOGOUT_START,
    REGISTER_START,
    RESEND_EMAIL_VERIFICATION_START,
    RESET_PASSWORD_START,
    VERIFY_EMAIL_START,
} = ACTION_TYPES;


/**
 * Controllers
 */

/**
 * Fetch the authenticated user
 */
function* authUserSaga ()
{
    try {
        const { data } = yield call(fetchAuthAsync);

        yield put(authUserSuccess(data));

    } catch ({ message }) {

        yield put(authUserFailed({
            errorMessages: message
        }));

    }
}

/**
 * Forgot password request
 */

function* forgotPasswordSaga (payload)
{
    try {
        const { message } = yield call(forgotPasswordAsync, payload);

        yield put(forgotPasswordSuccess());

        yield put(ALERT.showAlert({
            status: 'success',
            message
        }));

    } catch ({ message }) {

        yield put(forgotPasswordFailed({
            errorMessages: message,
        }));

    }
}


/**
 * Sign in's a user
 * 
 * @param {object} payload 
 */
function* loginSaga (payload)
{
    try {
        const { status, data } = yield call(loginAsync, payload);
        const data_ = data;

        if (status === 'success') 
        {
            const { access_token, expires_at, data } = data_;

            Cookies.set('access_token', access_token, expires_at);

            yield put(loginSuccess(data));
            
            yield put(push(PATH.DASHBOARD));
        }

    } catch ({ message }) {

        yield put(loginFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_LOGIN,
        }));

    }
}

/**
 * Sign's out a user
 */
 function* logoutSaga ()
{
    try {
        
        const { message, status } = yield call(logoutAsync);

        Cookies.remove('access_token');

        yield put(logoutSuccess());

        yield put(ALERT.showAlert({
            status: 'success',
            message
        }));

        yield put(push(PATH.LOGIN));

    } catch ({ message }) {

        yield put(logoutFailed({
            errorMessages: message
        }));

    }
 }

 
/**
 * Create a new user resource
 * 
 * @param {object} payload 
 */
function* registerSaga (payload)
{
    try {
        const { data, status, message } = yield call(registerAsync, payload);

        if (status === 'success') 
        {
            const { access_token } = data;

            Cookies.set('access_token', access_token);

            yield put(registrationSuccess());
            
            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

        yield put(push(PATH.LOGIN));

    } catch ({ message }) {

        yield put(registrationFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_REGISTER,
        }));

    }
}


function* resendEmailVerificationSaga ()
{
    try {
        const { message, status } = yield call(resendEmailVerificationAsync);

        if (status === 'success') 
        {
            yield put(resendEmailVerificationSuccess());

            yield put(ALERT.showAlert({
                status,
                message
            }));            
        }

    } catch ({ message }) {
        yield put(resendEmailVerificationFailed({
            errorMessages: message
        }));
        
        yield put(ALERT.showAlert({
            status: 'error',
            message
        }));
    }
}

/**
 * Reset the user's password
 */

function* resetPasswordSaga (payload)
{
    try {
        const { message, status } = yield call(resetPasswordAsync, payload);

        yield put(resetPasswordSuccess());

        yield put(ALERT.showAlert({
            status,
            message
        }));
        
        yield put(push(PATH.LOGIN));

    } catch ({ message }) {
        
        yield put(resetPasswordFailed({
            errorMessages: message 
        }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: message
        }));

    }
}

function* verifyEmailSaga (payload)
{
    try {
        yield call(verifyEmailAsync, payload);
    } catch ({ message }) {
        
        yield put(verifyEmailFailed({
            errorMessages: message
        }));
    }
}


/**
 * Watchers
 */
function* authUserWatcher () 
{
    while (true)
    {
        yield take(AUTH_USER_START); 

        yield call(authUserSaga);
    }
}

function* forgotPasswordWatcher () 
{
    while (true)
    {
        const { payload } = yield take(FORGOT_PASSWORD_START);

        yield call(forgotPasswordSaga, payload);
    }
}

function* loginWatcher () 
{
    while (true)
    {
        const { payload } = yield take(LOGIN_START); 

        yield call(loginSaga, payload);
    }
}

function* logoutWatcher () 
{
    while (true)
    {
        yield take(LOGOUT_START); 

        yield call(logoutSaga);
    }
}

function* registerWatcher () 
{
    while (true)
    {
        const { payload } = yield take(REGISTER_START); 

        yield call(registerSaga, payload);
    }
}

function* resendEmailVerificationWatcher ()
{
    while (true) 
    {
        yield take(RESEND_EMAIL_VERIFICATION_START);

        yield call(resendEmailVerificationSaga);
    }
}

function* resetPasswordWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(RESET_PASSWORD_START);

        yield call(resetPasswordSaga, payload);
    }
}

function* verifyEmailWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(VERIFY_EMAIL_START);

        yield call(verifyEmailSaga, payload);
    }
}


/**
 * Main
 */

export default function* ()
{
    yield all([
        authUserWatcher(),
        forgotPasswordWatcher(),
        loginWatcher(),
        logoutWatcher(),
        registerWatcher(),
        resendEmailVerificationWatcher(),
        resetPasswordWatcher(),
        verifyEmailWatcher()
    ]);
}