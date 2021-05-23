import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { KeyboardDatePicker } from '@material-ui/pickers';

/** API */
import { findByAccountAsync } from '../../../../services/banking/transaction';

/** Selectors */
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectAccount } from '../../../../redux/modules/account/selector';
import { selectBankAccountReconciliation } from '../../../../redux/modules/bank-account-reconciliation/selector';
import { selectDefaultSettings } from './../../../../redux/modules/default-settings/selector';

/** Actions */
import * as ACCOUNT from '../../../../redux/modules/account/actions';
import * as BANK_ACCOUNT_RECONCILIATION from '../../../../redux/modules/bank-account-reconciliation/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl, FormHelperText } from '@material-ui/core'
import { Card, CardContent, CardActions } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import InputAdornment from '@material-ui/core/InputAdornment'
import MaterialTable from '../../../../components/MaterialTable'

/** Material Ui Styles */
import { makeStyles, Button } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../components/AlertPopUp';

/** Material UI Icons */
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import PATH from '../../../../routes/path';
import TransactionBalance from './TransactionBalance';


const CreateBankAccountReconciliation = ({ alert, defaultSettingsProp, accountProp, bankAccountReconciliationProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, bankAccountReconciliation, bankAccountReconciliations, error } = bankAccountReconciliationProp;

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Date', 
            field: 'created_at', 
        },
        { 
            title: 'Description', 
            field: 'description', 
        },
        { 
            title: 'Contact', 
            field: 'contact', 
        },
        { 
            title: 'Deposit', 
            field: 'deposit', 
        },
        { 
            title: 'Withdrawal', 
            field: 'withdrawal'
        }
    ];

    const RECONCILIATION_DEFAULT_PROPS = {
        ...bankAccountReconciliation,
        account_id: defaultSettingsProp.defaultSettings.account_id
    };

    const [ bankAccountReconciliationState, setBankAccountReconciliationState ] = useState(RECONCILIATION_DEFAULT_PROPS);
    const [ ids, setIds ] = useState([]);
    const [ account, setAccount ] = useState(accountProp.account);
    const [ transactions, setTransactions ] = useState([]);
    const [ transactionBalance, setTransactionBalance ] = useState(0);

    const handleSelectionChange = (row) => setIds(row.map(({ id }) => id));

    const handleChange = (e) =>  
    {
        const { name, value } = e.target;

        if (name !== 'closing_balance') {
            setBankAccountReconciliationState({ ...bankAccountReconciliationState, [name]: value });
        }

        if (name === 'closing_balance') {

            if (account.balance < parseFloat(value)) {
                dispatch(ALERT.showAlert({
                    status: 'error',
                    message: 'Selected account current balance is not enough. Please select a new account'
                }));
            }
            else {
                setBankAccountReconciliationState({ ...bankAccountReconciliationState, [name]: value });
            }
        }
    }

    const handleClickReconcile = () => {
        dispatch(BANK_ACCOUNT_RECONCILIATION.createBankAccountReconciliation({
            ...bankAccountReconciliationState,
            status: 'Reconciled'
        }));
    };

    const handleChangeStartDate = (date) => setBankAccountReconciliationState({ ...bankAccountReconciliationState, started_at: date });

    const handleChangeEndDate = (date) => setBankAccountReconciliationState({ ...bankAccountReconciliationState, ended_at: date });

    const handleClickFetchTransactionsByAccount = async () => 
    {
        const { data, message, status } = await findByAccountAsync({ account_id: bankAccountReconciliationState.account_id });

        if (status !== 'success') {

        }

        if (status === 'success') 
        {
            const transactionList = data.map(({ created_at, description, contact, deposit, withdrawal }) => ({
                created_at,
                description,
                contact,
                deposit: deposit <= 0 ? 'N/A' : deposit,
                withdrawal: withdrawal <= 0 ? 'N/A' : withdrawal
            }))

            const transacBalance = data.reduce((total, { deposit, withdrawal }) => total + (deposit - withdrawal), 0);

            const findAccount = accountProp.accounts.find(({ id }) => id === bankAccountReconciliationState.account_id);

            setAccount(findAccount);
            setTransactions(transactionList);
            setTransactionBalance(transacBalance);
        }
    } 

    const onLoadFetchAccounts = () => dispatch(ACCOUNT.getAccounts());

    const onSubmitCreateReconciliation = (e) => {
        e.preventDefault();
        dispatch(BANK_ACCOUNT_RECONCILIATION.createBankAccountReconciliation(bankAccountReconciliationState));
    }

    useEffect(() => {
        onLoadFetchAccounts();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form onSubmit={ onSubmitCreateReconciliation }>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <InputLabel>Start date</InputLabel>
                                        <KeyboardDatePicker
                                            error={ Boolean(error.transferred_at) }
                                            helperText={ error.transferred_at }
                                            variant='outlined'
                                            format='yyyy-MM-dd'
                                            margin='normal'
                                            value={ bankAccountReconciliationState.started_at }
                                            onChange={ handleChangeStartDate }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <InputLabel>End date</InputLabel>
                                        <KeyboardDatePicker
                                            error={ Boolean(error.ended_at) }
                                            helperText={ error.ended_at }
                                            variant='outlined'
                                            format='yyyy-MM-dd'
                                            margin='normal'
                                            value={ bankAccountReconciliationState.ended_at }
                                            onChange={ handleChangeEndDate }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                        <InputLabel htmlFor='closing_balance'>Closing balance</InputLabel>
                                        <TextField
                                            id='closing_balance'
                                            fullWidth
                                            name='closing_balance'
                                            variant='outlined'
                                            error={ Boolean(error.closing_balance) }
                                            helperText={ error.closing_balance }
                                            value={ bankAccountReconciliationState.closing_balance }
                                            onChange={ handleChange }
                                            InputProps={{
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalAtmIcon />
                                                </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                        <FormControl error={ Boolean(error.from_account_id) } fullWidth>
                                            <InputLabel htmlFor='account_id'>Account</InputLabel>
                                            <Select
                                                id='account_id'
                                                name='account_id'
                                                variant='outlined'
                                                value={ bankAccountReconciliationState.account_id }
                                                onChange={ handleChange }
                                                label='Account'
                                                fullWidth
                                            >
                                                {
                                                    accountProp.accounts.map(({ id, name }) => (
                                                        <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            <FormHelperText>{ error.account_id }</FormHelperText>
                                        </FormControl> 
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                        <Button 
                                            variant="contained" 
                                            color="default"
                                            onClick={ handleClickFetchTransactionsByAccount }
                                        >
                                            Transactions
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>                
                    </form>         
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }      
                        data={ transactions } 
                        onSelectionChange={ rows => handleSelectionChange(rows) }
                        title={ 'Transactions' }
                    />   
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TransactionBalance 
                        openingBalance={ account.balance }
                        closingBalance={ bankAccountReconciliationState.closing_balance || 0 }
                        clearedAmount={ transactionBalance }
                        difference={  
                            (parseFloat(bankAccountReconciliationState.closing_balance) + parseFloat(transactionBalance)).toFixed(2) || 0 
                        }
                        handleClickReconcile={ handleClickReconcile }
                        handleClickSave={ onSubmitCreateReconciliation }
                        handleClickCancel={ () => PATH.BANK_ACCOUNT_RECONCILIATION }
                    />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    defaultSettingsProp: selectDefaultSettings,
    accountProp: selectAccount,
    bankAccountReconciliationProp: selectBankAccountReconciliation
});

export default connect(mapStateToProps, null)(CreateBankAccountReconciliation)
