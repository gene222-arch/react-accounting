import React from 'react'

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { ListItemText } from '@material-ui/core'
import { Card, CardContent } from '@material-ui/core'

/** Material UI Icons */
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TollIcon from '@material-ui/icons/Toll';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/** Components */
import SettingItem from './SettingItem';


const Settings = () => 
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ BusinessIcon }
                                    primaryText='Company'
                                    secondaryText='Change company name, email, address, tax number etc...'
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ CategoryIcon }
                                    primaryText='Categories'
                                    secondaryText='Unlimited categories for income, expense, and item etc...'
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ AttachMoneyIcon }
                                    primaryText='Currencies'
                                    secondaryText='Create and manage currencies and set their rates'
                                />
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ TollIcon }
                                    primaryText='Taxes'
                                    secondaryText='Fixed, normal, inclusive, and compound tax rates'
                                />
                            </Grid>
                         </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Settings
