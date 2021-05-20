import React, { useState, useEffect } from 'react'

/** API */
import balanceSheetAsync from './../../../../services/reports/accounting/balance.sheet';

/** Material UI Components */
import { Card, CardContent } from '@material-ui/core'
import { List, ListItem, ListItemSecondaryAction, ListItemText , Typography, Container} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import * as STRING_HELPER from '../../../../utils/string'

/**
 * Todo: Think of a way to show the total current asset, fixed asset, etc.
 */

const displayBalanceSheetData = (balanceSheetData) => 
{
    let elem = [];

    for (const key in balanceSheetData) 
    {
        if (balanceSheetData[key]) 
        {
            if (Array.isArray(balanceSheetData[key])) {
                elem.push(
                    <List key={ key }>
                    {
                        balanceSheetData[key].map(({ name, amount }, index) => (
                            <ListItem key={ index }>
                                <ListItemText 
                                    primary={ name } 
                                    secondary={ STRING_HELPER.kebabCaseToTitle(key) }
                                />
                                <ListItemSecondaryAction>{ amount }</ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                    </List>
                );
            }
        }
    }

    return elem;
}

const displayBalanceSheet = (balanceSheet) => 
{
    let elem = [];

    for (const key in balanceSheet) 
    {
        if (balanceSheet[key]) {
            elem.push(
                <Grid container spacing={1} key={ key }>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {
                            isNaN(balanceSheet[key])
                                ? (
                                    <Typography variant="h6" color="initial">{ STRING_HELPER.ucfirst(key) }</Typography>
                                )
                                : (
                                    <>
                                        <Divider />
                                        <List>
                                            <ListItem>
                                                <ListItemText primary={ 
                                                    <Typography variant="h6" color="initial">
                                                        { STRING_HELPER.kebabCaseToTitle(key) }
                                                    </Typography> 
                                                }/>
                                                <ListItemSecondaryAction>
                                                    <strong>{ balanceSheet[key].toFixed(2) }</strong>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                        <Divider />
                                    </>
                                )
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        { displayBalanceSheetData(balanceSheet[key]) }
                    </Grid>
                </Grid>
            );
        }
    }

    return elem;
}

const BalanceSheet = () => 
{
    const [ balanceSheet, setBalanceSheet ] = useState({});
    

    const fetchBalanceSheet = async () => 
    {
        try {
            const { data, message, status } = await balanceSheetAsync();

            if (status !== 'success') {
    
            }
    
            if (status === 'success') {
                setBalanceSheet(data);
            }
        } catch({ message }) {

        }
    }

    useEffect(() => {
        fetchBalanceSheet();
    }, []);

    return (
        <Container maxWidth="lg">
            { displayBalanceSheet(balanceSheet) }
        </Container>
    )
}

export default BalanceSheet
