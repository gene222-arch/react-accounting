import React, { lazy } from 'react'
import { connect } from 'react-redux';

/** Selectors */
import { selectAuth } from './../../../redux/modules/auth/selector';
import { createStructuredSelector } from 'reselect';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Card, CardContent } from '@material-ui/core'

/** Material UI Icons */
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/Payment';
import TollIcon from '@material-ui/icons/Toll';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

/** Components */
import PATH from './../../../routes/path';

const SettingItem = lazy(() => import('./SettingItem'))



const Settings = ({ auth }) => 
{
    return (
        <>
            <Container maxWidth="lg">
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ AccountCircleIcon }
                                    primaryText='Account'
                                    secondaryText='Change account information like name, email, etc...'
                                    path={ PATH.ACCOUNT }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ BusinessIcon }
                                    primaryText='Company'
                                    secondaryText='Change company name, email, address, tax number etc...'
                                    path={ PATH.UPDATE_COMPANY.replace(':id', auth.company.id) }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ CategoryIcon }
                                    primaryText='Categories'
                                    secondaryText='Unlimited categories for income, expense, and item etc...'
                                    path={ PATH.CATEGORIES }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ CategoryIcon }
                                    primaryText='Salary Benefits'
                                    secondaryText='Create and manage salary beneits and set their amount'
                                    path={ PATH.SALARY_BENEFIT }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ MonetizationOnIcon }
                                    primaryText='Currencies'
                                    secondaryText='Create and manage currencies and set their rates'
                                    path={ PATH.CURRENCY }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ MonetizationOnIcon }
                                    primaryText='Contribution'
                                    secondaryText='Create and manage contributions and set their rates'
                                    path={ PATH.CONTRIBUTION }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ MonetizationOnIcon }
                                    primaryText='Default Settings'
                                    secondaryText='Manage default settings'
                                    path={ PATH.UPDATE_DEFAULT_SETTINGS }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ TollIcon }
                                    primaryText='Taxes'
                                    secondaryText='Fixed, normal, inclusive, and compound tax rates'
                                    path={ PATH.TAX }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ PaymentIcon }
                                    primaryText='Payment Methods'
                                    secondaryText='Create unlimited payment methods for admin usage'
                                    path={ PATH.PAYMENT_METHOD }
                                />
                            </Grid>
                         </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: selectAuth
});

export default connect(mapStateToProps, null)(Settings);
