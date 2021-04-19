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
    doubleEntryJournalEntry,
    toggleDoubleEntry, 
    selectDoubleEntryChartOfAccount,
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
                    {/* Pay Calendar */}
                    <ListItem button selected={ doubleEntryChartOfAccount } onClick={ selectDoubleEntryChartOfAccount }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Pay Calendar</Typography>
                        }/>
                    </ListItem>

                    {/* Run DoubleEntry */}
                    <ListItem button selected={ doubleEntryJournalEntry } onClick={ selectDoubleEntryJournalEntry }>
                        <ListItemText primary={
                            <Typography variant="subtitle2" color="initial">Run DoubleEntry</Typography>
                        }/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

export default DoubleEntry
