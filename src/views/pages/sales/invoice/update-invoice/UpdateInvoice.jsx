import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns'

/** Selectors */
import { selectInvoice } from '../../../../../redux/modules/invoice/selector';
import { selectCustomer } from '../../../../../redux/modules/customer/selector';
import { selectCurrency } from '../../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';
import { selectDiscount } from './../../../../../redux/modules/discount/selector';
import { selectTax } from './../../../../../redux/modules/tax/selector';


/** Actions */
import * as INVOICE from '../../../../../redux/modules/invoice/actions';
import * as CUSTOMER from '../../../../../redux/modules/customer/actions';
import * as CURRENCY from '../../../../../redux/modules/currency/actions';
import * as DISCOUNT from '../../../../../redux/modules/discount/actions'
import * as TAX from '../../../../../redux/modules/tax/actions'
import * as ALERT from '../../../../../redux/modules/alert/actions'

/** API */
import { findAsync } from '../../../../../services/sales/invoice';

/** Material UI Components */
import { Card, CardContent, CardActions } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../../components/AlertPopUp';
import SelectCustomer from './SelectCustomer';
import InvoiceDetail from './InvoiceDetail';
import SelectItems from './SelectItems';
import PaymentDetail from './PaymentDetail';
import RecurringAndMore from './RecurringAndMore';

import * as DATE from '../../../../../utils/date'
import PATH from '../../../../../routes/path';

const ITEM_DISCOUNT_TAX_DEFAULT_PROPS = { id: 0, rate: 0 };

const UpdateInvoice = ({ alert, currencyProp, discountProp, taxProp, customerProp, invoiceProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, invoice, paymentDetail, error } = invoiceProp;

    const [ isFetching, setIsFetching ] = useState(false);
    const [ invoiceState, setInvoiceState ] = useState(invoice);
    const [ paymentDetailState, setPaymentDetailState ] = useState(paymentDetail);
    const [ currency, setCurrency ] = useState(ITEM_DISCOUNT_TAX_DEFAULT_PROPS);
    const [ discount, setDiscount ] = useState(ITEM_DISCOUNT_TAX_DEFAULT_PROPS);
    const [ items, setItems ] = useState([]);
    const [ tax, setTax ] = useState(ITEM_DISCOUNT_TAX_DEFAULT_PROPS);


    const handleChange = (e) => setInvoiceState({ ...invoiceState, [e.target.name]: e.target.value });

    const handleChangeInvoiceDate = (date) => setInvoiceState({ ...invoiceState, date: format(date, 'yyyy-MM-dd') });

    const handleChangeDueDate = (date) => setInvoiceState({ ...invoiceState, due_date: format(date, 'yyyy-MM-dd') });

    const handleClickReselectCustomer = () => setInvoiceState({ ...invoiceState, customer_id: 0 });

    const onLoadFetchInvoice = async () => 
    {
        setIsFetching(true);

        try {
            const { data, message, status } = await findAsync({ id });

            if (status !== 'success') {
    
            }
    
            if (status === 'success') 
            {
                const { items: itemList, payment_detail, histories, transactions, ...details } = data;
                const { customer, currency, income_category, ...invoiceData } = details;

                setCurrency({ id: details.currency.id });
                setDiscount({ ...discount, id: payment_detail.discount_id });
                setTax({ ...tax, id: payment_detail.tax_id });
                setInvoiceState(invoiceData);
                setItems(itemList.map(({ pivot }) => pivot));
                setPaymentDetailState(payment_detail);
            }
        } catch ({ message }) {

        }

        setIsFetching(false);
    }

    const onLoadFetchCustomers = () => dispatch(CUSTOMER.getCustomers());

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onLoadFetchDiscounts = () => dispatch(DISCOUNT.getDiscounts());

    const onLoadFetchTaxes = () => dispatch(TAX.getTaxes());

    const onSubmitUpdateInvoice = (e) => {
        dispatch(INVOICE.updateInvoice({
            ...invoiceState,
            currency_id: currency.id,
            items: items.map(({ tableData, ...item }) => item),
            payment_details: {
                ...paymentDetailState,
                discount_id: discount.id,
                tax_id: tax.id
            }
        }))
    };

    useEffect(() => {
        onLoadFetchInvoice();
        onLoadFetchCustomers();
        onLoadFetchCurrencies();
        onLoadFetchDiscounts();
        onLoadFetchTaxes();
    }, []);

    return !isFetching && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateInvoice }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <SelectCustomer
                                            invoiceState={ invoiceState } 
                                            customerProp={ customerProp }
                                            handleChange={ handleChange } 
                                            handleClickReselectCustomer={ handleClickReselectCustomer }
                                            error={ error } 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InvoiceDetail
                                            invoiceState={ invoiceState }
                                            invoiceDate={ invoiceState.date }
                                            handleChangeInvoiceDate={ handleChangeInvoiceDate }
                                            dueDate={ invoiceState.due_date }
                                            handleChangeDueDate={ handleChangeDueDate }
                                            handleChange={ handleChange }
                                            error={ error }
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>                   
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <SelectItems 
                            discounts={ discountProp.discounts }
                            taxes={ taxProp.taxes }
                            discount={ discount }
                            tax={ tax }
                            items={ items } 
                            setItems={ setItems } 
                            paymentDetailState={ paymentDetailState }
                            setPaymentDetailState={ setPaymentDetailState }
                        />
                    </Grid>   
                    <Grid item item xs={12} sm={12} md={6} lg={6} style={{ marginLeft: 'auto' }}>
                        <PaymentDetail 
                            currencies={ currencyProp.currencies }
                            taxes={ taxProp.taxes }
                            discounts={ discountProp.discounts }
                            currency={ currency }
                            setCurrency={ setCurrency }
                            discount={ discount }
                            setDiscount={ setDiscount }
                            paymentDetailState={ paymentDetailState }
                            setPaymentDetailState={ setPaymentDetailState }
                            tax={ tax }
                            setTax={ setTax }
                            items={ items }
                            setItems={ setItems }
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <RecurringAndMore invoiceState={ invoiceState } handleChange={ handleChange } />
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <SaveCancelButtons 
                                    isLoading={ isLoading }
                                    cancelBtnCallback={ () => history.push(PATH.INVOICE) }
                                    saveBtnCallback={ onSubmitUpdateInvoice }
                                />
                            </CardActions>
                        </Card>
                    </Grid>     
                </Grid>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    currencyProp: selectCurrency,
    customerProp: selectCustomer,
    invoiceProp: selectInvoice,
    discountProp: selectDiscount,
    taxProp: selectTax
});

export default connect(mapStateToProps, null)(UpdateInvoice)
