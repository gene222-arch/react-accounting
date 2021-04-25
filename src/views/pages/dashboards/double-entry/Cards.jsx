import React from 'react'

/** Material UI Components */
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'

/** Material UI Icons */
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

const Cards = ({totalExpense, totalIncome, totalProfit, receivables, payables, upcoming}) => 
{
    return (
        <>
            <Grid container spacing={1} justify='center'>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Card>
                        <CardHeader
                            action={
                                <Avatar>
                                    <AccountBalanceIcon />
                                </Avatar>
                            }
                            title='TOTAL INCOME'
                            subheader={ totalIncome.toFixed(2) }
                            titleTypographyProps={{ 
                                variant: 'subtitle2'
                            }}
                            subheaderTypographyProps={{ 
                                variant: 'h4',
                                color: '#2c2c2c'
                             }}
                        />  
                        <CardContent>
                            <Grid container spacing={1} justify='space-between' alignItems='center'>
                                <Grid item>
                                    <Typography variant="subtitle2" color="initial">Receivables</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="initial">50 / { receivables.amount }</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid> 
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Card>
                        <CardHeader
                            action={
                                <Avatar>
                                    <MoneyOffIcon />
                                </Avatar>
                            }
                            title='TOTAL EXPENSE'
                            subheader={ totalExpense.toFixed(2) }
                            titleTypographyProps={{ 
                                variant: 'subtitle2',
                                color: '#dddddd'
                            }}
                            subheaderTypographyProps={{ 
                                variant: 'h4',
                                color: '#2c2c2c'
                             }}
                        />  
                        <CardContent>
                            <Grid container spacing={1} justify='space-between'  alignItems='center'>
                                <Grid item>
                                    <Typography variant="subtitle2" color="initial">Payables</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="initial">50 / { payables.amount }</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid> 
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Card>
                        <CardHeader
                            action={
                                <Avatar>
                                    <AttachMoneyIcon />
                                </Avatar>
                            }
                            title='TOTAL PROFIT'
                            subheader={ totalProfit.toFixed(2) }
                            titleTypographyProps={{ 
                                variant: 'subtitle2',
                                color: '#dddddd'
                            }}
                            subheaderTypographyProps={{ 
                                variant: 'h4',
                                color: '#2c2c2c'
                             }}
                        />  
                        <CardContent>
                            <Grid container spacing={1} justify='space-between'  alignItems='center'>
                                <Grid item>
                                    <Typography variant="subtitle2" color="initial">Upcoming</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="initial">50 / { upcoming.amount }</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid> 
            </Grid>
        </>
    )
}

export default Cards
