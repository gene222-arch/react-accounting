import React from 'react'

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'

/** Components */
import StyledNavLink from './../../../components/styled-components/StyledNavLink';


const SettingItem = ({ icon: Icon, primaryText, secondaryText = '', path }) => {
    return (
        <>
            <Grid container spacing={1} alignItems='center'>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <Icon fontSize='large' button/>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <StyledNavLink to={ path } text={
                        <ListItemText 
                            primary={
                                <Typography variant="h6" color="initial">
                                    { primaryText }
                                </Typography>
                            } 
                            secondary={ secondaryText } 
                        />
                    }
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default SettingItem
