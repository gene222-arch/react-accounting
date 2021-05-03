import React from 'react'
import { connect } from 'react-redux';

/** Selectors */
import { selectAuth } from '../../../redux/modules/auth/selector';
import { createStructuredSelector } from 'reselect';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Card, CardContent } from '@material-ui/core'

/** Material UI Icons */
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

/** Components */
import SettingItem from './SettingItem';
import PATH from '../../../routes/path';



const Categories = ({ auth }) => 
{
    return (
        <>
            <Container maxWidth="lg">
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ AttachMoneyIcon }
                                    primaryText='Income Categories'
                                    secondaryText='....'
                                    path={ PATH.INCOME_CATEGORY }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <SettingItem
                                    icon={ MoneyOffIcon }
                                    primaryText='Expense Categories'
                                    secondaryText='....'
                                    path=''
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

export default connect(mapStateToProps, null)(Categories);
