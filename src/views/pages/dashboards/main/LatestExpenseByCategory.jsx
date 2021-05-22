import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';


const latestExpenseByCategoryUseStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: shadows[1]
    },
}));

const LatestExpenseByCategory = ({ latestExpenseByCategory }) => 
{
  const classes = latestExpenseByCategoryUseStyles();

    return (
            <List 
                className={classes.root}
                subheader={
                    <ListSubheader component="div">
                        Latest Expense By Category
                    </ListSubheader>
            }>
                {
                    latestExpenseByCategory.map(({paid_at, category, amount}, index) => (
                        <ListItem key={ index }>
                            <ListItemText primary={ category } secondary={ paid_at } />
                            <ListItemSecondaryAction>
                                { amount }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        );
}

export default LatestExpenseByCategory;