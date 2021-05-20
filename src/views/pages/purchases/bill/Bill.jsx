import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEqual } from 'date-fns';

/** Selectors */
import { selectBill } from '../../../../redux/modules/bill/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as BILL from '../../../../redux/modules/bill/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles, Button, Typography } from '@material-ui/core';

/** Components */
import MaterialTable from '../../../../components/MaterialTable'
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import InvoiceStatus from './BillStatus';

import PATH from '../../../../routes/path';
import * as DATE from '../../../../utils/date'



const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const Invoice = ({ alert, billProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Number', 
            field: 'bill_number', 
            render: ({ id, bill_number }) => <StyledNavLink to={ PATH.VIEW_BILL.replace(':id', id)} text={ bill_number } />
        },
        { title: 'Vendor', field: 'vendor' },
        { title: 'Amount', field: 'amount_due' },
        { title: 'Bill date', field: 'date' },
        { 
            title: 'Due date', 
            field: 'due_date',
            render: ({ due_date }) => (
                <Typography 
                    variant="subtitle2" 
                    color={ 
                        (new Date(DATE.today())).getTime() > (new Date(due_date)).getTime() 
                            ? 'error' 
                            : 'initial' 
                }> { due_date } </Typography>
            )

        },
        { 
            title: 'Status', 
            field: 'status',
            render: ({ status }) => <InvoiceStatus status={ status } />
        },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(BILL.getBills());

    const handleClickDestroy = () => {
        dispatch(BILL.destroyBills({ ids }));
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
            <MaterialTable
                columns={ columns }      
                data={ billProp.bills }  
                isLoading={ billProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_BILL) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    billProp: selectBill
});

export default connect(mapStateToProps, null)(Invoice)