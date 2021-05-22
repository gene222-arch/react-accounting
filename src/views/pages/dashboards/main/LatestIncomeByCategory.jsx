import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

const latestIncomeByCategoryUseStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: shadows[1]
    },
}));

const LatestIncomeByCategory = ({ latestIncomeByCategory }) => 
{
  const classes = latestIncomeByCategoryUseStyles();

    return (
            <List 
                className={classes.root}
                subheader={
                    <ListSubheader component="div">
                        Latest Income By Category
                    </ListSubheader>
            }>
                {
                    latestIncomeByCategory.map(({paid_at, category, amount}, index) => (
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

export default LatestIncomeByCategory;