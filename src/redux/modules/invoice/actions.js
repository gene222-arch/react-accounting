import ACTION_TYPES from './action.types';

const {
    GET_INVOICES_START,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAILED,

    CREATE_INVOICE_START,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAILED,

    MAIL_CUSTOMER_START,
    MAIL_CUSTOMER_SUCCESS,
    MAIL_CUSTOMER_FAILED,

    MARK_INVOICE_AS_PAID_START,
    MARK_INVOICE_AS_PAID_SUCCESS,
    MARK_INVOICE_AS_PAID_FAILED,

    INVOICE_PAYMENT_START,
    INVOICE_PAYMENT_SUCCESS,
    INVOICE_PAYMENT_FAILED,

    UPDATE_INVOICE_START,
    UPDATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_FAILED,

    CANCEL_INVOICE_START,
    CANCEL_INVOICE_SUCCESS,
    CANCEL_INVOICE_FAILED,

    DESTROY_INVOICES_START,
    DESTROY_INVOICES_SUCCESS,
    DESTROY_INVOICES_FAILED
} = ACTION_TYPES;


export const getInvoices = (payload = {}) => ({
    type: GET_INVOICES_START,
    payload
});

export const getInvoicesSuccess = (payload) => ({
    type: GET_INVOICES_SUCCESS,
    payload
});

export const getInvoicesFailed = (payload) => ({
    type: GET_INVOICES_FAILED,
    payload
});

export const createInvoice = (payload) => ({
    type: CREATE_INVOICE_START,
    payload
});

export const createInvoiceSuccess = () => ({
    type: CREATE_INVOICE_SUCCESS
});

export const createInvoiceFailed = (payload) => ({
    type: CREATE_INVOICE_FAILED,
    payload
});

export const mailCustomer = (payload) => ({
    type: MAIL_CUSTOMER_START,
    payload
});

export const mailCustomerSuccess = () => ({
    type: MAIL_CUSTOMER_SUCCESS
});

export const mailCustomerFailed = (payload) => ({
    type: MAIL_CUSTOMER_FAILED,
    payload
});

export const markAsPaid = (payload) => ({
    type: MARK_INVOICE_AS_PAID_START,
    payload
});

export const markAsPaidSuccess = () => ({
    type: MARK_INVOICE_AS_PAID_SUCCESS
});

export const markAsPaidFailed = (payload) => ({
    type: MARK_INVOICE_AS_PAID_FAILED,
    payload
});

export const payment = (payload) => ({
    type: INVOICE_PAYMENT_START,
    payload
});

export const paymentSuccess = () => ({
    type: INVOICE_PAYMENT_SUCCESS
});

export const paymentFailed = (payload) => ({
    type: INVOICE_PAYMENT_FAILED,
    payload
});

export const updateInvoice = (payload) => ({
    type: UPDATE_INVOICE_START,
    payload
});

export const updateInvoiceSuccess = () => ({
    type: UPDATE_INVOICE_SUCCESS
});

export const updateInvoiceFailed = (payload) => ({
    type: UPDATE_INVOICE_FAILED,
    payload
});

export const cancelInvoice = (payload) => ({
    type: CANCEL_INVOICE_START,
    payload
});

export const cancelInvoiceSuccess = () => ({
    type: CANCEL_INVOICE_SUCCESS
});

export const cancelInvoiceFailed = (payload) => ({
    type: CANCEL_INVOICE_FAILED,
    payload
});

export const destroyInvoices = (payload) => ({
    type: DESTROY_INVOICES_START,
    payload
});

export const destroyInvoicesSuccess = (payload) => ({
    type: DESTROY_INVOICES_SUCCESS,
    payload
});

export const destroyInvoicesFailed = (payload) => ({
    type: DESTROY_INVOICES_FAILED,
    payload
});