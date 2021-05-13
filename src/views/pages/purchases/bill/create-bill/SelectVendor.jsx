import React from 'react'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl, FormHelperText } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Card, CardContent, CardActions, Grid, TextField, Typography, Button } from '@material-ui/core'

/** Material UI Icons */
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { makeStyles } from '@material-ui/core/styles';


const selectVendorUseStyles = makeStyles(theme => ({
    reselectVendorBtn: {
        backgroundColor: '#FFF',
        '&:hover': {
            color: theme.palette.error.main,
            backgroundColor: '#FFF',
        }
    }
}));

const SelectVendor = ({ billState, vendorProp, handleChange, handleClickReselectVendor, error }) => 
{
    const classes = selectVendorUseStyles();

    let vendor = vendorProp.vendors.find(({ id }) => id === billState.vendor_id);

    return (
        <Grid container spacing={1}>
            {
                !vendor && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl error={ Boolean(error.vendor_id) } fullWidth>
                            <InputLabel>Add a vendor</InputLabel>
                            <Select
                                value={ billState.vendor_id }
                                onChange={ handleChange }
                                inputProps={{
                                    name: 'vendor_id'
                                }}
                                fullWidth
                            >
                                {
                                    vendorProp.vendors.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                }
                            </Select>
                            <FormHelperText>{ error.vendor_id || '' }</FormHelperText>
                        </FormControl> 
                    </Grid>
                )
            }  
            {
                vendor && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="initial">Bill to</Typography>
                                <Typography variant="subtitle1" color="initial">
                                    { vendor.name }
                                </Typography>
                                <Typography variant="subtitle2" color="initial">
                                    { vendor.address }
                                </Typography>
                                <Typography variant="subtitle2" color="initial">
                                    Tax number: { vendor.tax_number }
                                </Typography>
                                <Typography variant="subtitle2" color="initial">
                                    { vendor.email }
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant='text' 
                                    color="default" 
                                    className={ classes.reselectVendorBtn }
                                    onClick={ handleClickReselectVendor }
                                >
                                    <PersonAddDisabledIcon /> Choose a different vendor
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }            
        </Grid>         
    )
}

export default SelectVendor
