import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


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
    classes 
}) => {
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
                    <ListItem button selected={ bankingAccount } onClick={ selectBankingAccount }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Accounts</Typography>
                        }/>
                    </ListItem>

                    {/* Transfers */}
                    <ListItem button selected={ bankingTransfer } onClick={ selectBankingTransfer }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Transfers</Typography>
                        }/>
                    </ListItem>
                    
                    {/* Transactions */}
                    <ListItem button selected={ bankingTransaction } onClick={ selectBankingTransaction }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Transactions</Typography>
                        }/>
                    </ListItem>

                    {/* Reconciliations */}
                    <ListItem button selected={ bankingReconciliation } onClick={ selectBankingReconciliation }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Reconciliations</Typography>
                        }/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

export default Banking
