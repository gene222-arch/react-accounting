import ACTION_TYPES from './action.types';


const { 

    AUTH_USER_START,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILED,

    FORGOT_PASSWORD_START,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,

    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,

    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    REGISTER_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,

    RESEND_EMAIL_VERIFICATION_START,
    RESEND_EMAIL_VERIFICATION_SUCCESS,
    RESEND_EMAIL_VERIFICATION_FAILED,

    RESET_PASSWORD_START,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    VERIFY_EMAIL_START,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILED
} = ACTION_TYPES;


/**
 * Fetch the authenticated user and permissions
 * 
 * @returns { object }
 */

export const authUser = () => ({
    type: AUTH_USER_START
});

export const authUserSuccess = (payload) => ({
    type: AUTH_USER_SUCCESS,
    payload
});

export const authUserFailed = (payload) => ({
    type: AUTH_USER_FAILED,
    payload
});


/**
 * Reset password
 */

export const forgotPassword = (payload) => ({
    type: FORGOT_PASSWORD_START,
    payload
});

export const forgotPasswordSuccess = () => ({
    type: FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFailed = (payload) => ({
    type: FORGOT_PASSWORD_FAILED,
    payload
});

/**
 * Signing in/Login
 */
export const login = (payload) => ({
    type: LOGIN_START,
    payload
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailed = (payload) => ({
    type: LOGIN_FAILED,
    payload
});


/**
 * Signing out/Logout
 */

export const logoutStart = () => ({
    type: LOGOUT_START
});

export const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload
});

export const logoutFailed = (payload) => ({
    type: LOGOUT_FAILED,
    payload
});


/**
 * Registration
 */
export const register = (payload) => ({
    type: REGISTER_START,
    payload
});

export const registrationSuccess = () => ({
    type: REGISTRATION_SUCCESS
});

export const registrationFailed = (payload) => ({
    type: REGISTRATION_FAILED,
    payload
});


/**
 * Resend email verification
 */
export const resendEmailVerification = () => ({
    type: RESEND_EMAIL_VERIFICATION_START
});

export const resendEmailVerificationSuccess = () => ({
    type: RESEND_EMAIL_VERIFICATION_SUCCESS
});

export const resendEmailVerificationFailed = (payload) => ({
    type: RESEND_EMAIL_VERIFICATION_FAILED,
    payload
});


/**
 * Reset password
 */

export const resetPassword = (payload) => ({
    type: RESET_PASSWORD_START,
    payload
});

export const resetPasswordSuccess = () => ({
    type: RESET_PASSWORD_SUCCESS
});

export const resetPasswordFailed = (payload) => ({
    type: RESET_PASSWORD_FAILED,
    payload
});

/**
 * Verify email
 */
export const verifyEmail = (payload) => ({
    type: VERIFY_EMAIL_START,
    payload
});

export const verifyEmailSuccess = () => ({
    type: VERIFY_EMAIL_SUCCESS
});

export const verifyEmailFailed = (payload) => ({
    type: VERIFY_EMAIL_FAILED,
    payload
});