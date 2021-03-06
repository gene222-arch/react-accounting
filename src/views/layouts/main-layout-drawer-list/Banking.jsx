import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/** Components */
import StyledNavLink from './../../../components/styled-components/StyledNavLink';

import PATH from './../../../routes/path';

const Banking = ({ 
    openBanking, 
    bankingAccount,
    bankingTransfer,
    bankingTransaction,
    bankingReconciliation,
    toggleBanking, 
    selectBankingAccount,
    selectBankingTransfer,
    selectBankingTransaction,
    selectBankingReconciliation,
    classes,
    permissions 
}) => {

    const canManageAccounts = permissions.includes('Manage Accounts');
    const canManageTransfers = permissions.includes('Manage Bank Account Transfers');
    const canViewTransactions = permissions.includes('View Transactions');
    const canManageReconciliations = permissions.includes('Manage Bank Account Reconciliations');

    if (!(canManageAccounts || canManageTransfers || canManageReconciliations || canViewTransactions)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ toggleBanking }>
                <ListItemIcon>
                    <AccountBalanceIcon fontSize='small'/>
                </ListItemIcon>
                <ListItemText primary={'Banking'} />
                { !openBanking ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openBanking } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Accounts */}
                    {
                        canManageAccounts && (
                            <StyledNavLink to={ PATH.ACCOUNT } text={
                                <ListItem button selected={ bankingAccount } onClick={ selectBankingAccount }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Accounts</Typography>
                                    }/>
                                </ListItem>
                            }
                            />
                        )
                    }

                    {/* Transfers */}
                    {
                        canManageTransfers && (
                            <StyledNavLink to={ PATH.BANK_ACCOUNT_TRANSFER } text={
                                <ListItem button selected={ bankingTransfer } onClick={ selectBankingTransfer }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Transfers</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }
                    
                    {/* Transactions */}
                    {
                        canViewTransactions && (
                            <StyledNavLink to={ PATH.TRANSACTION } text={
                                <ListItem button selected={ bankingTransaction } onClick={ selectBankingTransaction }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Transactions</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }

                    {/* Reconciliations */}
                    {
                        canManageReconciliations && (
                            <StyledNavLink to={ PATH.BANK_ACCOUNT_RECONCILIATION } text={
                                <ListItem button selected={ bankingReconciliation } onClick={ selectBankingReconciliation }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Reconciliations</Typography>
                                    }/>
                                </ListItem>
                            } />
                        )
                    }
                </List>
            </Collapse>            
        </>
    )
}

export default Banking
