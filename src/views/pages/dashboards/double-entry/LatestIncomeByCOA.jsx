import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

const latestIncomeByCOAUseStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: shadows[1]
    },
}));

const LatestIncomeByCOA = ({ latestIncomeByChartOfAccounts }) => 
{
  const classes = latestIncomeByCOAUseStyles();

    return (
            <List 
                className={classes.root}
                subheader={
                    <ListSubheader component="div">
                        Latest Income By COA
                    </ListSubheader>
            }>
                {
                    latestIncomeByChartOfAccounts.map(({date, name, amount}, index) => (
                        <ListItem key={ index }>
                            <ListItemText primary={ name } secondary={ date } />
                            <ListItemSecondaryAction>
                                { amount }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        );
}

export default LatestIncomeByCOA;