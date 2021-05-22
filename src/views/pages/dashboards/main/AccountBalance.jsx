import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

const accountBalanceUseStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: shadows[1]
    },
}));

const AccountBalance = ({ accountBalances }) => 
{
  const classes = accountBalanceUseStyles();

    return (
            <List 
                className={classes.root}
                subheader={
                    <ListSubheader component="div">
                        Account Balance
                    </ListSubheader>
            }>
                {
                    accountBalances?.map(({ name, balance }, index) => (
                        <ListItem key={ index }>
                            <ListItemText primary={ name }/>
                            <ListItemSecondaryAction>
                                { balance }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        );
}

export default AccountBalance;