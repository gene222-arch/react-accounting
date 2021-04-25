import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';


const latestExpenseByCOAUseStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: shadows[1]
    },
}));

const LatestExpenseByCOA = ({ latestExpenseByChartOfAccounts }) => 
{
  const classes = latestExpenseByCOAUseStyles();

    return (
            <List 
                className={classes.root}
                subheader={
                    <ListSubheader component="div">
                        Latest Expense By COA
                    </ListSubheader>
            }>
                {
                    latestExpenseByChartOfAccounts.map(({date, name, amount}, index) => (
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

export default LatestExpenseByCOA;