import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const DoubleEntry = ({ 
    openDoubleEntry, 
    doubleEntryChartOfAccount,
    doubleEntryChartOfAccountType,
    doubleEntryJournalEntry,
    toggleDoubleEntry, 
    selectDoubleEntryChartOfAccount,
    selectDoubleEntryChartOfAccountType,
    selectDoubleEntryJournalEntry,
    classes 
}) => {
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
                    <ListItem button selected={ doubleEntryChartOfAccount } onClick={ selectDoubleEntryChartOfAccount }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Chart of Accounts</Typography>
                        }/>
                    </ListItem>

                    {/* Chart of Account Types */}
                    <ListItem button selected={ doubleEntryChartOfAccountType } onClick={ selectDoubleEntryChartOfAccountType }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Chart of Account Types</Typography>
                        }/>
                    </ListItem>

                    {/* Journal Entries */}
                    <ListItem button selected={ doubleEntryJournalEntry } onClick={ selectDoubleEntryJournalEntry }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Journal Entries</Typography>
                        }/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

export default DoubleEntry
