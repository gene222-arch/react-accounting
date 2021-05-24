import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectEstimateInvoice } from '../../../../redux/modules/estimate-invoice/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as ESTIMATE_INVOICE from '../../../../redux/modules/estimate-invoice/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles, Button, Typography, Grid } from '@material-ui/core';

/** Components */
import MaterialTable from '../../../../components/MaterialTable'
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import EstimateInvoiceStatus from './EstimateInvoiceStatus';

import PATH from '../../../../routes/path';
import * as DATE from '../../../../utils/date'


const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const EstimateInvoice = ({ alert, estimateInvoiceProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Number', 
            field: 'estimate_number', 
            render: ({ id, estimate_number }) => <StyledNavLink to={ PATH.VIEW_ESTIMATE_INVOICE.replace(':id', id)} text={ estimate_number } />
        },
        { title: 'Customer', field: 'customer' },
        { title: 'Amount', field: 'total' },
        { title: 'Estimate date', field: 'estimated_at' },
        { 
            title: 'Expiry date', 
            field: 'expired_at',
            render: ({ expired_at }) => (
                <Typography 
                    variant="subtitle2" 
                    color={ 
                        (new Date(DATE.today())).getTime() > (new Date(expired_at)).getTime() 
                            ? 'error' 
                            : 'initial' }
                >
                    { expired_at }
                </Typography> 
            )

        },
        { 
            title: 'Status', 
            field: 'status',
            render: ({ status }) => <EstimateInvoiceStatus status={ status } />
        },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(({ id }) => id));

    const onLoadFetchAll = () => dispatch(ESTIMATE_INVOICE.getEstimateInvoices());

    const handleClickDestroy = () => {
        dispatch(ESTIMATE_INVOICE.destroyEstimateInvoices({ ids }));
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
                    <MaterialTable
                        columns={ columns }      
                        data={ estimateInvoiceProp.estimateInvoices }  
                        isLoading={ estimateInvoiceProp.isLoading }
                        onSelectionChange={ rows => onSelectionChange(rows) }
                        title={ 
                            <ActionButton 
                                classes={ classes } 
                                ids={ ids } 
                                handleClickRedirect = { () => history.push(PATH.CREATE_ESTIMATE_INVOICE) }
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
    estimateInvoiceProp: selectEstimateInvoice
});

export default connect(mapStateToProps, null)(EstimateInvoice)