import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns'

/** Selectors */
import { selectDefaultSettings } from './../../../../../redux/modules/default-settings/selector';
import { selectInvoice } from '../../../../../redux/modules/invoice/selector';
import { selectCustomer } from '../../../../../redux/modules/customer/selector';
import { selectCurrency } from '../../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';

/** Actions */
import * as INVOICE from '../../../../../redux/modules/invoice/actions';
import * as CUSTOMER from '../../../../../redux/modules/customer/actions';
import * as CURRENCY from '../../../../../redux/modules/currency/actions';
import * as ALERT from '../../../../../redux/modules/alert/actions'

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


const CreateInvoice = ({ alert, defaultSettingsProp, currencyProp, customerProp, invoiceProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, invoice, paymentDetail, error } = invoiceProp;
    const {  defaultSettings } = defaultSettingsProp;

    /** Default props */
    const CURRENCY_DEFAULT_PROPS = { id: defaultSettings.currency_id, rate: 0 };
    const INVOICE_DEFAULT_PROPS = { ...invoice, income_category_id: defaultSettings.income_category_id };
    const DISCOUNT_DEFAULT_PROPS = { id: 0, rate: 0 };
    const TAX_DEFAULT_PROPS = { id: defaultSettings.tax_id, rate: 0 };

    /** States */
    const [ invoiceState, setInvoiceState ] = useState(INVOICE_DEFAULT_PROPS);
    const [ paymentDetailState, setPaymentDetailState ] = useState(paymentDetail);
    const [ currency, setCurrency ] = useState(CURRENCY_DEFAULT_PROPS);
    const [ discount, setDiscount ] = useState(DISCOUNT_DEFAULT_PROPS);
    const [ items, setItems ] = useState([]);
    const [ tax, setTax ] = useState(TAX_DEFAULT_PROPS);

    const handleChange = (e) => setInvoiceState({ ...invoiceState, [e.target.name]: e.target.value });

    const handleChangeInvoiceDate = (date) => setInvoiceState({ ...invoiceState, date: format(date, 'yyyy-MM-dd') });

    const handleChangeDueDate = (date) => setInvoiceState({ ...invoiceState, due_date: format(date, 'yyyy-MM-dd') });

    const handleClickReselectCustomer = () => setInvoiceState({ ...invoiceState, customer_id: 0 });

    const onLoadFetchCustomers = () => dispatch(CUSTOMER.getCustomers());

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onSubmitCreateInvoice = (e) => {

        dispatch(INVOICE.createInvoice({
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
        onLoadFetchCustomers();
        onLoadFetchCurrencies();
    }, []);

    return (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitCreateInvoice }>
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
                                            invoiceDate={ invoiceState.invoiceDate }
                                            handleChangeInvoiceDate={ handleChangeInvoiceDate }
                                            dueDate={ invoiceState.dueDate }
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
                            items={ items } 
                            setItems={ setItems } 
                            paymentDetailState={ paymentDetailState }
                            setPaymentDetailState={ setPaymentDetailState }
                        />
                    </Grid>   
                    <Grid item item xs={12} sm={12} md={6} lg={6} style={{ marginLeft: 'auto' }}>
                        <PaymentDetail 
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
                                    saveBtnCallback={ onSubmitCreateInvoice }
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
    defaultSettingsProp: selectDefaultSettings,
    currencyProp: selectCurrency,
    customerProp: selectCustomer,
    invoiceProp: selectInvoice,
});

export default connect(mapStateToProps, null)(CreateInvoice)
