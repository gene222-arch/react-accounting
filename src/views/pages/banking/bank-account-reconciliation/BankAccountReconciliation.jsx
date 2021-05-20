import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectBankAccountReconciliation } from '../../../../redux/modules/bank-account-reconciliation/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as BANK_ACCOUNT_RECONCILIATION from '../../../../redux/modules/bank-account-reconciliation/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import ReconciliationStatus from './ReconciliationStatus';
import MaterialTable from '../../../../components/MaterialTable'

import PATH from '../../../../routes/path';



const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const BankAccountReconciliation = ({ alert, reconciliationProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Date', 
            field: 'created_at', 
            render: ({ id, created_at }) => (
                <StyledNavLink 
                    to={ PATH.UPDATE_BANK_ACCOUNT_RECONCILIATION.replace(':id', id) } 
                    text={ created_at } 
                />
            )
        },
        { 
            title: 'Account', 
            field: 'account', 
        },
        { 
            title: 'Period', 
            field: 'period', 
        },
        { 
            title: 'Closing balance', 
            field: 'closing_balance', 
        },
        { 
            title: 'Status', 
            field: 'status',
            render: ({ status }) => <ReconciliationStatus status={ status } />
        }
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const handleClickDestroy = () => {
        dispatch(BANK_ACCOUNT_RECONCILIATION.destroyBankAccountReconciliations({ ids }));
        setIds([]);
    };

    const onLoadFetchAll = () => {
        if (!reconciliationProp.bankAccountReconciliations.length) {
            dispatch(BANK_ACCOUNT_RECONCILIATION.getBankAccountReconciliations());
        }
    }

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
                data={ reconciliationProp.bankAccountReconciliations }  
                isLoading={ reconciliationProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_BANK_ACCOUNT_RECONCILIATION) }
                        handleClickDestroy={ handleClickDestroy }
                    /> 
                }
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    reconciliationProp: selectBankAccountReconciliation
});

export default connect(mapStateToProps, null)(BankAccountReconciliation)