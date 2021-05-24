import ACTION_TYPES from './action.types';

const {
    GET_ESTIMATE_INVOICES_START,
    GET_ESTIMATE_INVOICES_SUCCESS,
    GET_ESTIMATE_INVOICES_FAILED,

    CREATE_ESTIMATE_INVOICE_START,
    CREATE_ESTIMATE_INVOICE_SUCCESS,
    CREATE_ESTIMATE_INVOICE_FAILED,

    CONVERT_TO_INVOICE_START,
    CONVERT_TO_INVOICE_SUCCESS,
    CONVERT_TO_INVOICE_FAILED,

    MAIL_ESTIMATE_INVOICE_CUSTOMER_START,
    MAIL_ESTIMATE_INVOICE_CUSTOMER_SUCCESS,
    MAIL_ESTIMATE_INVOICE_CUSTOMER_FAILED,

    MARK_ESTIMATE_INVOICE_AS_APPROVED_START,
    MARK_ESTIMATE_INVOICE_AS_APPROVED_SUCCESS,
    MARK_ESTIMATE_INVOICE_AS_APPROVED_FAILED,

    MARK_ESTIMATE_INVOICE_AS_REFUSED_START,
    MARK_ESTIMATE_INVOICE_AS_REFUSED_SUCCESS,
    MARK_ESTIMATE_INVOICE_AS_REFUSED_FAILED,

    UPDATE_ESTIMATE_INVOICE_START,
    UPDATE_ESTIMATE_INVOICE_SUCCESS,
    UPDATE_ESTIMATE_INVOICE_FAILED,

    DESTROY_ESTIMATE_INVOICES_START,
    DESTROY_ESTIMATE_INVOICES_SUCCESS,
    DESTROY_ESTIMATE_INVOICES_FAILED
} = ACTION_TYPES;


export const getEstimateInvoices = (payload = {}) => ({
    type: GET_ESTIMATE_INVOICES_START,
    payload
});

export const getEstimateInvoicesSuccess = (payload) => ({
    type: GET_ESTIMATE_INVOICES_SUCCESS,
    payload
});

export const getEstimateInvoicesFailed = (payload) => ({
    type: GET_ESTIMATE_INVOICES_FAILED,
    payload
});

export const createEstimateInvoice = (payload) => ({
    type: CREATE_ESTIMATE_INVOICE_START,
    payload
});

export const createEstimateInvoiceSuccess = () => ({
    type: CREATE_ESTIMATE_INVOICE_SUCCESS
});

export const createEstimateInvoiceFailed = (payload) => ({
    type: CREATE_ESTIMATE_INVOICE_FAILED,
    payload
});

export const convertToInvoice = (payload) => ({
    type: CONVERT_TO_INVOICE_START,
    payload
});

export const convertToInvoiceSuccess = (payload) => ({
    type: CONVERT_TO_INVOICE_SUCCESS,
    payload
});

export const convertToInvoiceFailed = (payload) => ({
    type: CONVERT_TO_INVOICE_FAILED,
    payload
});

export const mailEstimateInvoiceCustomer = (payload) => ({
    type: MAIL_ESTIMATE_INVOICE_CUSTOMER_START,
    payload
});

export const mailEstimateInvoiceCustomerSuccess = () => ({
    type: MAIL_ESTIMATE_INVOICE_CUSTOMER_SUCCESS
});

export const mailEstimateInvoiceCustomerFailed = (payload) => ({
    type: MAIL_ESTIMATE_INVOICE_CUSTOMER_FAILED,
    payload
});

export const markAsApproved = (payload) => ({
    type: MARK_ESTIMATE_INVOICE_AS_APPROVED_START,
    payload
});

export const markAsApprovedSuccess = (payload) => ({
    type: MARK_ESTIMATE_INVOICE_AS_APPROVED_SUCCESS,
    payload
});

export const markAsApprovedFailed = (payload) => ({
    type: MARK_ESTIMATE_INVOICE_AS_APPROVED_FAILED,
    payload
});

export const markAsRefused = (payload) => ({
    type: MARK_ESTIMATE_INVOICE_AS_REFUSED_START,
    payload
});

export const markAsRefusedSuccess = (payload) => ({
    type: MARK_ESTIMATE_INVOICE_AS_REFUSED_SUCCESS,
    payload
});

export const markAsRefusedFailed = (payload) => ({
    type: MARK_ESTIMATE_INVOICE_AS_REFUSED_FAILED,
    payload
});

export const updateEstimateInvoice = (payload) => ({
    type: UPDATE_ESTIMATE_INVOICE_START,
    payload
});

export const updateEstimateInvoiceSuccess = () => ({
    type: UPDATE_ESTIMATE_INVOICE_SUCCESS
});

export const updateEstimateInvoiceFailed = (payload) => ({
    type: UPDATE_ESTIMATE_INVOICE_FAILED,
    payload
});

export const destroyEstimateInvoices = (payload) => ({
    type: DESTROY_ESTIMATE_INVOICES_START,
    payload
});

export const destroyEstimateInvoicesSuccess = (payload) => ({
    type: DESTROY_ESTIMATE_INVOICES_SUCCESS,
    payload
});

export const destroyEstimateInvoicesFailed = (payload) => ({
    type: DESTROY_ESTIMATE_INVOICES_FAILED,
    payload
});