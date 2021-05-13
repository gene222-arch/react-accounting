const ACTION_TYPES = 
{
    GET_BILLS_START: 'GET_BILLS_START',
    GET_BILLS_SUCCESS: 'GET_BILLS_SUCCESS',
    GET_BILLS_FAILED: 'GET_BILLS_FAILED',
    
    CREATE_BILL_START: 'CREATE_BILL_START',
    CREATE_BILL_SUCCESS: 'CREATE_BILL_SUCCESS',
    CREATE_BILL_FAILED: 'CREATE_BILL_FAILED',

    MAIL_VENDOR_START: 'MAIL_VENDOR_START',
    MAIL_VENDOR_SUCCESS: 'MAIL_VENDOR_SUCCESS',
    MAIL_VENDOR_FAILED: 'MAIL_VENDOR_FAILED',

    MARK_BILL_AS_PAID_START: 'MARK_BILL_AS_PAID_START',
    MARK_BILL_AS_PAID_SUCCESS: 'MARK_BILL_AS_PAID_SUCCESS',
    MARK_BILL_AS_PAID_FAILED: 'MARK_BILL_AS_PAID_FAILED',

    MARK_BILL_AS_RECEIVED_START: 'MARK_BILL_AS_RECEIVED_START',
    MARK_BILL_AS_RECEIVED_SUCCESS: 'MARK_BILL_AS_RECEIVED_SUCCESS',
    MARK_BILL_AS_RECEIVED_FAILED: 'MARK_BILL_AS_RECEIVED_FAILED',

    BILL_PAYMENT_START: 'BILL_PAYMENT_START',
    BILL_PAYMENT_SUCCESS: 'BILL_PAYMENT_SUCCESS',
    BILL_PAYMENT_FAILED: 'BILL_PAYMENT_FAILED',

    UPDATE_BILL_START: 'UPDATE_BILL_START',
    UPDATE_BILL_SUCCESS: 'UPDATE_BILL_SUCCESS',
    UPDATE_BILL_FAILED: 'UPDATE_BILL_FAILED',

    CANCEL_BILL_START: 'CANCEL_BILL_START',
    CANCEL_BILL_SUCCESS: 'CANCEL_BILL_SUCCESS',
    CANCEL_BILL_FAILED: 'CANCEL_BILL_FAILED',

    DESTROY_BILLS_START: 'DESTROY_BILLS_START',
    DESTROY_BILLS_SUCCESS: 'DESTROY_BILLS_SUCCESS',
    DESTROY_BILLS_FAILED: 'DESTROY_BILLS_FAILED',
};

export default ACTION_TYPES;