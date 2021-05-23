import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns'

/** Selectors */
import { selectDefaultSettings } from './../../../../../redux/modules/default-settings/selector';
import { selectBill } from '../../../../../redux/modules/bill/selector';
import { selectVendor } from '../../../../../redux/modules/vendor/selector';
import { selectCurrency } from '../../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';

/** Actions */
import * as BILL from '../../../../../redux/modules/bill/actions';
import * as VENDOR from '../../../../../redux/modules/vendor/actions';
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
import SelectVendor from './SelectVendor';
import BillDetail from './BillDetail';
import SelectItems from './SelectItems';
import PaymentDetail from './PaymentDetail';
import RecurringAndMore from './RecurringAndMore';

import * as DATE from '../../../../../utils/date'
import PATH from '../../../../../routes/path';


const CreateBill = ({ alert, currencyProp, defaultSettingsProp, vendorProp, billProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, bill, paymentDetail, error } = billProp;
    const { defaultSettings } = defaultSettingsProp; 

    /** Default props */
    const CURRENCY_DEFAULT_PROPS = { id: defaultSettings.currency_id, rate: 0 };
    const BILL_DEFAULT_PROPS = { ...bill, income_category_id: defaultSettings.income_category_id };
    const DISCOUNT_TAX_DEFAULT_PROPS = { id: 0, rate: 0 };

    const [ billState, setBillState ] = useState(BILL_DEFAULT_PROPS);
    const [ paymentDetailState, setPaymentDetailState ] = useState(paymentDetail);
    const [ currency, setCurrency ] = useState(CURRENCY_DEFAULT_PROPS);
    const [ items, setItems ] = useState([]);
    const [ discount, setDiscount ] = useState(DISCOUNT_TAX_DEFAULT_PROPS);
    const [ tax, setTax ] = useState(DISCOUNT_TAX_DEFAULT_PROPS);

    const handleChange = (e) => setBillState({ ...billState, [e.target.name]: e.target.value });

    const handleChangeIBillDate = (date) => setBillState({ ...billState, date: format(date, 'yyyy-MM-dd') });

    const handleChangeDueDate = (date) => setBillState({ ...billState, due_date: format(date, 'yyyy-MM-dd') });

    const handleClickReselectVendor = () => setBillState({ ...billState, vendor_id: 0 });

    const onLoadFetchVendors = () => dispatch(VENDOR.getVendors());

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onSubmitCreateBill = (e) => {

        dispatch(BILL.createBill({
            ...billState,
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
        onLoadFetchVendors();
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
            <form onSubmit={ onSubmitCreateBill }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <SelectVendor 
                                            billState={ billState } 
                                            vendorProp={ vendorProp }
                                            handleChange={ handleChange } 
                                            handleClickReselectVendor={ handleClickReselectVendor }
                                            error={ error } 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <BillDetail
                                            billState={ billState }
                                            invoiceDate={ billState.invoiceDate }
                                            handleChangeIBillDate={ handleChangeIBillDate }
                                            dueDate={ billState.dueDate }
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
                                <RecurringAndMore billState={ billState } handleChange={ handleChange } />
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <SaveCancelButtons 
                                    isLoading={ isLoading }
                                    cancelBtnCallback={ () => history.push(PATH.BILL) }
                                    saveBtnCallback={ onSubmitCreateBill }
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
    vendorProp: selectVendor,
    billProp: selectBill
});

export default connect(mapStateToProps, null)(CreateBill)
