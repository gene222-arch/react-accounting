import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/** Components */
import StyledNavLink from '../../../components/styled-components/StyledNavLink'

import PATH from './../../../routes/path';


const DoubleEntry = ({ 
    openDoubleEntry, 
    doubleEntryChartOfAccount,
    doubleEntryChartOfAccountType,
    doubleEntryJournalEntry,
    toggleDoubleEntry, 
    selectDoubleEntryChartOfAccount,
    selectDoubleEntryChartOfAccountType,
    selectDoubleEntryJournalEntry,
    classes,
    permissions
}) => {
    const canManageChartOfAccounts = permissions.includes('Manage Chart Of Accounts');
    const canManageChartOfAccountTypes = permissions.includes('Manage Chart of Account Types');
    const canManageJournalEntries = permissions.includes('Manage Journal Entries');

    if (!(canManageChartOfAccounts || canManageChartOfAccountTypes || canManageJournalEntries)) {
        return '';
    }

    return (
        <>
            <ListItem button onClick={ toggleDoubleEntry }>
                <ListItemIcon>
                    <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary={'DoubleEntry'} />
                { !openDoubleEntry ? <ArrowRightIcon /> : <ArrowDropDownIcon /> }
            </ListItem>
            
            <Collapse 
                in={ openDoubleEntry } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Chart of Accounts */}
                    {
                        canManageChartOfAccounts && (
                            <StyledNavLink to={ PATH.CHART_OF_ACCOUNT } text={ 
                                <ListItem button selected={ doubleEntryChartOfAccount } onClick={ selectDoubleEntryChartOfAccount }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">
                                            Chart of Accounts
                                        </Typography>
                                    }/>
                                </ListItem>
                             } />
                        )
                    }

                    {/* Chart of Account Types */}
                    {
                        canManageChartOfAccountTypes && (
                            <StyledNavLink to={ PATH.CHART_OF_ACCOUNT_TYPE } text={ 
                                <ListItem button selected={ doubleEntryChartOfAccountType } onClick={ selectDoubleEntryChartOfAccountType }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Chart of Account Types</Typography>
                                    }/>
                                </ListItem>
                             } />
                        )
                    }

                    {/* Journal Entries */}
                    {
                        canManageJournalEntries && (
                            <StyledNavLink to={ PATH.JOURNAL_ENTRY } text={ 
                                <ListItem button selected={ doubleEntryJournalEntry } onClick={ selectDoubleEntryJournalEntry }>
                                    <ListItemText primary={
                                        <Typography variant="subtitle2" color="initial">Journal Entries</Typography>
                                    }/>
                                </ListItem>
                             } 
                            />
                        )
                    }
                </List>
            </Collapse>            
        </>
    )
}

export default DoubleEntry
