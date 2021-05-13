import ACTION_TYPES from './action.types';

const {
    GET_BILLS_START,
    GET_BILLS_SUCCESS,
    GET_BILLS_FAILED,

    CREATE_BILL_START,
    CREATE_BILL_SUCCESS,
    CREATE_BILL_FAILED,

    MAIL_VENDOR_START,
    MAIL_VENDOR_SUCCESS,
    MAIL_VENDOR_FAILED,

    MARK_BILL_AS_PAID_START,
    MARK_BILL_AS_PAID_SUCCESS,
    MARK_BILL_AS_PAID_FAILED,

    MARK_BILL_AS_RECEIVED_START,
    MARK_BILL_AS_RECEIVED_SUCCESS,
    MARK_BILL_AS_RECEIVED_FAILED,

    BILL_PAYMENT_START,
    BILL_PAYMENT_SUCCESS,
    BILL_PAYMENT_FAILED,

    UPDATE_BILL_START,
    UPDATE_BILL_SUCCESS,
    UPDATE_BILL_FAILED,

    CANCEL_BILL_START,
    CANCEL_BILL_SUCCESS,
    CANCEL_BILL_FAILED,

    DESTROY_BILLS_START,
    DESTROY_BILLS_SUCCESS,
    DESTROY_BILLS_FAILED
} = ACTION_TYPES;


export const getBills = (payload = {}) => ({
    type: GET_BILLS_START,
    payload
});

export const getBillsSuccess = (payload) => ({
    type: GET_BILLS_SUCCESS,
    payload
});

export const getBillsFailed = (payload) => ({
    type: GET_BILLS_FAILED,
    payload
});

export const createBill = (payload) => ({
    type: CREATE_BILL_START,
    payload
});

export const createBillSuccess = () => ({
    type: CREATE_BILL_SUCCESS
});

export const createBillFailed = (payload) => ({
    type: CREATE_BILL_FAILED,
    payload
});

export const mailVendor = (payload) => ({
    type: MAIL_VENDOR_START,
    payload
});

export const mailVendorSuccess = () => ({
    type: MAIL_VENDOR_SUCCESS
});

export const mailVendorFailed = (payload) => ({
    type: MAIL_VENDOR_FAILED,
    payload
});

export const markAsPaid = (payload) => ({
    type: MARK_BILL_AS_PAID_START,
    payload
});

export const markAsPaidSuccess = () => ({
    type: MARK_BILL_AS_PAID_SUCCESS
});

export const markAsPaidFailed = (payload) => ({
    type: MARK_BILL_AS_PAID_FAILED,
    payload
});

export const markAsReceived = (payload) => ({
    type: MARK_BILL_AS_RECEIVED_START,
    payload
});

export const markAsReceivedSuccess = () => ({
    type: MARK_BILL_AS_RECEIVED_SUCCESS
});

export const markAsReceivedFailed = (payload) => ({
    type: MARK_BILL_AS_RECEIVED_FAILED,
    payload
});

export const payment = (payload) => ({
    type: BILL_PAYMENT_START,
    payload
});

export const paymentSuccess = () => ({
    type: BILL_PAYMENT_SUCCESS
});

export const paymentFailed = (payload) => ({
    type: BILL_PAYMENT_FAILED,
    payload
});

export const updateBill = (payload) => ({
    type: UPDATE_BILL_START,
    payload
});

export const updateBillSuccess = () => ({
    type: UPDATE_BILL_SUCCESS
});

export const updateBillFailed = (payload) => ({
    type: UPDATE_BILL_FAILED,
    payload
});

export const cancelBill = (payload) => ({
    type: CANCEL_BILL_START,
    payload
});

export const cancelBillSuccess = () => ({
    type: CANCEL_BILL_SUCCESS
});

export const cancelBillFailed = (payload) => ({
    type: CANCEL_BILL_FAILED,
    payload
});

export const destroyBills = (payload) => ({
    type: DESTROY_BILLS_START,
    payload
});

export const destroyBillsSuccess = (payload) => ({
    type: DESTROY_BILLS_SUCCESS,
    payload
});

export const destroyBillsFailed = (payload) => ({
    type: DESTROY_BILLS_FAILED,
    payload
});