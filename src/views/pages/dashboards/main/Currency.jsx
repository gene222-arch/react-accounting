import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

const currencyUseStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: shadows[1]
    },
}));

const Currency = ({ currencies }) => 
{
  const classes = currencyUseStyles();

    return (
            <List 
                className={classes.root}
                subheader={
                    <ListSubheader component="div">
                        Currencies
                    </ListSubheader>
            }>
                {
                    currencies?.map(({ name, rate }, index) => (
                        <ListItem key={ index }>
                            <ListItemText primary={ name }/>
                            <ListItemSecondaryAction>
                                { rate }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        );
}

export default Currency;