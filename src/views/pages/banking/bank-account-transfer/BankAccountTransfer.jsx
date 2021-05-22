import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectBankAccountTransfer } from '../../../../redux/modules/bank-account-transfer/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectUser } from '../../../../redux/modules/auth/selector';

/** Actions */
import * as BANK_ACCOUNT_TRANSFER from '../../../../redux/modules/bank-account-transfer/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** File saver */
import { generateTransferExcelAsync } from './../../../../services/exports/excel/bank.account.transfer';
import { generateTransferCSVAsync } from './../../../../services/exports/csv/bank.account.transfer';

/** Material Ui Styles */
import { makeStyles, Grid } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import DualOptionDialog from './../../../../components/DualOptionDialog';
import ImportExportActions from '../../../../components/ImportExportActions';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';

/** Material UI Icons */
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

import PATH from '../../../../routes/path';


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


const BankAccountTransfer = ({ alert, userProp, transferProp }) => 
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

    const handleClickExportTransferExcel = () => generateTransferExcelAsync(userProp.email);
    
    const handleClickExportTransferCSV = () => generateTransferCSVAsync(userProp.email);

    const onSelectionChange = (rows) => setIds(rows.map(({ id }) => id));

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
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ImportExportActions 
                        title='Transfers'
                        handleClickExportExcel={ handleClickExportTransferExcel }
                        handleClickExportCSV={ handleClickExportTransferCSV }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
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
                </Grid>
            </Grid>  
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    transferProp: selectBankAccountTransfer,
    userProp: selectUser
});

export default connect(mapStateToProps, null)(BankAccountTransfer)