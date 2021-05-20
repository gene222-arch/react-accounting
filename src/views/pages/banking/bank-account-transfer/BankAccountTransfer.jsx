import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectBankAccountTransfer } from '../../../../redux/modules/bank-account-transfer/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as BANK_ACCOUNT_TRANSFER from '../../../../redux/modules/bank-account-transfer/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import DualOptionDialog from './../../../../components/DualOptionDialog';

/** Material UI Icons */
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

import PATH from '../../../../routes/path';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';



const itemUseStyles = makeStyles(theme => ({
    reverseTransactionIcon: {
        '*:hover': {
            color: theme.palette.error.main
        }
    }
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const BankAccountTransfer = ({ alert, transferProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    const [ id, setId ] = useState(0);
    const [ reverseTransacDialog, setReverseTransacDialog ] = useState(false);
    
    const actions = [
        {
            icon: () => <SettingsBackupRestoreIcon className={ classes.reverseTransactionIcon }/>,
            tooltip: 'Reverse Transaction',
            onClick: (event, { id }) => {
                setId(id);
                setReverseTransacDialog(true);
            }
        }
    ];

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Date', 
            field: 'transferred_at', 
            render: ({ id, transferred_at }) => (
                <StyledNavLink 
                    to={ PATH.UPDATE_BANK_ACCOUNT_TRANSFER.replace(':id', id) } 
                    text={ transferred_at } 
                />
            )
        },
        { 
            title: 'From Account', 
            field: 'from', 
        },
        { 
            title: 'To Account', 
            field: 'to', 
        },
        { 
            title: 'Amount', 
            field: 'amount', 
        }
    ];

    const options = {
        selection: false,
        actionsColumnIndex: -1
    };

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const handleClickCloseReverseTransac = () => setReverseTransacDialog(false);

    const handleClickReverseTransaction = () => dispatch(BANK_ACCOUNT_TRANSFER.reverseBankAccountTransfers({ id }));

    const handleClickDestroy = () => {
        dispatch(BANK_ACCOUNT_TRANSFER.destroyBankAccountTransfers({ ids }));
        setIds([]);
    };

    const onLoadFetchAll = () => {
        if (!transferProp.bankAccountTransfers.length) {
            dispatch(BANK_ACCOUNT_TRANSFER.getBankAccountTransfers());
        }
    }

    useEffect(() => {
        onLoadFetchAll();
    }, []);

    return (
        <>
            <DualOptionDialog 
                open={ reverseTransacDialog }
                handleClose={ handleClickCloseReverseTransac }
                dialogTitle={ 'Reverse Transaction' }
                dialogContent={ 'Are you sure to reverse the transaction?' }
                successCallback={ handleClickReverseTransaction }
            />
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <MaterialTable
                actions={ actions }
                columns={ columns }      
                options={ options }
                data={ transferProp.bankAccountTransfers }  
                isLoading={ transferProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_BANK_ACCOUNT_TRANSFER) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    transferProp: selectBankAccountTransfer
});

export default connect(mapStateToProps, null)(BankAccountTransfer)