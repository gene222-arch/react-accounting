import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectPayment } from '../../../../redux/modules/payment/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectUser } from '../../../../redux/modules/auth/selector';

/** Actions */
import * as PAYMENT from '../../../../redux/modules/payment/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** File saver */
import { generatePaymentExcelAsync } from './../../../../services/exports/excel/payment';
import { generatePaymentCSVAsync } from './../../../../services/exports/csv/payment';

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles, Grid } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import ImportExportActions from '../../../../components/ImportExportActions';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';

import PATH from '../../../../routes/path';


const paymentUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const Payment = ({ alert, userProp, paymentProp }) => 
{
    const history = useHistory();
    const classes = paymentUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Date', 
            field: 'date', 
            render: ({ id, date }) => <StyledNavLink to={ PATH.UPDATE_PAYMENT.replace(':id', id) } text={ date } />
        },
        { 
            title: 'Amount', 
            field: 'amount', 
        },
        { 
            title: 'Vendor', 
            field: 'vendor', 
        },
        { 
            title: 'Category', 
            field: 'category', 
        },
        { 
            title: 'Account', 
            field: 'account', 
        },
    ];

    const handleClickExportPaymentExcel = () => generatePaymentExcelAsync(userProp.email);
    
    const handleClickExportPaymentCSV = () => generatePaymentCSVAsync(userProp.email);

    const onSelectionChange = (rows) => setIds(rows.map(({ id }) => id));

    const onLoadFetchAll = () => dispatch(PAYMENT.getPayments());

    const handleClickDestroy = () => {
        dispatch(PAYMENT.destroyPayments({ ids }));
        setIds([]);
    };

    useEffect(() => {
        onLoadFetchAll();
    }, []);

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
                    <ImportExportActions 
                        title='Bills'
                        handleClickExportExcel={ handleClickExportPaymentExcel }
                        handleClickExportCSV={ handleClickExportPaymentCSV }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }      
                        data={ paymentProp.payments }  
                        isLoading={ paymentProp.isLoading }
                        onSelectionChange={ rows => onSelectionChange(rows) }
                        title={ 
                            <ActionButton 
                                classes={ classes } 
                                ids={ ids } 
                                handleClickRedirect = { () => history.push(PATH.CREATE_PAYMENT) }
                                handleClickDestroy={ handleClickDestroy }
                            /> }
                        onSelectionChange={rows => onSelectionChange(rows)}
                    />  
                </Grid>
            </Grid> 
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    paymentProp: selectPayment,
    userProp: selectUser
});

export default connect(mapStateToProps, null)(Payment)