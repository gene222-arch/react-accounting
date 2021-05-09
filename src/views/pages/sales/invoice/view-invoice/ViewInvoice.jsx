import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { findAsync } from '../../../../../services/sales/invoice';

/** Actions */
import * as INVOICE from './../../../../../redux/modules/invoice/actions';
import * as ALERT from '../../../../../redux/modules/alert/actions'

/** Selectors */
import { selectInvoice } from './../../../../../redux/modules/invoice/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';
import { selectAuth } from './../../../../../redux/modules/auth/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Card, CardContent } from '@material-ui/core'

/** Components */
import Header from './Header';
import Actions from './Actions';
import HistoriesAndTransactions from './HistoriesAndTransactions';
import AlertPopUp from '../../../../../components/AlertPopUp';
import Items from './Items';



const ViewInvoice = ({ authProp, alert, invoiceProp, match }) => 
{
    const dispatch = useDispatch();
    const { id } = match.params;

    const { invoice, paymentDetail: paymentDetailState, isLoading } = invoiceProp;

    const [ invoiceDetails, setInvoiceDetails ] = useState(invoice);
    const [ items, setItems ] = useState([]);
    const [ histories, setHistories ] = useState([]);
    const [ paymentDetail, setPaymentDetail ] = useState(paymentDetailState);
    const [ transactions, setTransactions ] = useState([]);


    const onLoadFetchInvoice = async () => {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') 
        {
            const { items: itemList, payment_detail, histories, transactions, ...details } = data;

            setInvoiceDetails(details);
            setItems(itemList.map(({ pivot }) => pivot));
            setHistories(histories);
            setTransactions(transactions);
            setPaymentDetail(payment_detail);
        }
    }

    useEffect(() => {
        onLoadFetchInvoice();
    }, [isLoading]);

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Header invoiceDetails={ invoiceDetails } paymentDetail={ paymentDetail }/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Actions 
                                invoiceDetails={ invoiceDetails } 
                                isLoading={ isLoading }
                                paymentDetail={ paymentDetail }
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Items 
                        auth={ authProp }
                        invoiceDetails={ invoiceDetails } 
                        items={ items }
                        paymentDetail={ paymentDetail }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <HistoriesAndTransactions histories={ histories } transactions={ transactions }/>
                </Grid> 
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    authProp: selectAuth,
    alert: selectAlert,
    invoiceProp: selectInvoice
});

export default connect(mapStateToProps, null)(ViewInvoice);
