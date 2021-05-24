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


const selectCustomerUseStyles = makeStyles(theme => ({
    reselectCustomerBtn: {
        backgroundColor: '#FFF',
        '&:hover': {
            color: theme.palette.error.main,
            backgroundColor: '#FFF',
        }
    }
}));

const SelectCustomer = ({ estimateInvoiceState, customerProp, handleChange, handleClickReselectCustomer, error }) => 
{
    const classes = selectCustomerUseStyles();

    let customer = customerProp.customers.find(({ id }) => id === estimateInvoiceState.customer_id);

    return (
        <Grid container spacing={1}>
            {
                !customer && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl error={ Boolean(error.customer_id) } fullWidth>
                            <InputLabel>Add a customer</InputLabel>
                            <Select
                                value={ estimateInvoiceState.customer_id }
                                onChange={ handleChange }
                                inputProps={{
                                    name: 'customer_id'
                                }}
                                fullWidth
                            >
                                {
                                    customerProp.customers.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                }
                            </Select>
                            <FormHelperText>{ error.customer_id || '' }</FormHelperText>
                        </FormControl> 
                    </Grid>
                )
            }  
            {
                customer && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="initial">Bill to</Typography>
                                <Typography variant="subtitle1" color="initial">
                                    { customer.name }
                                </Typography>
                                <Typography variant="subtitle2" color="initial">
                                    { customer.address }
                                </Typography>
                                <Typography variant="subtitle2" color="initial">
                                    Tax number: { customer.tax_number }
                                </Typography>
                                <Typography variant="subtitle2" color="initial">
                                    { customer.email }
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant='text' 
                                    color="default" 
                                    className={ classes.reselectCustomerBtn }
                                    onClick={ handleClickReselectCustomer }
                                >
                                    <PersonAddDisabledIcon /> Choose a different customer
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }            
        </Grid>         
    )
}

export default SelectCustomer
