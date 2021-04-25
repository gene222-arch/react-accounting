import React from 'react'

/** Material UI Components */
import { Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const TrackStock = ({ stock, handleChangeStock, error, vendors }) => 
{
    const { vendor, in_stock, minimum_stock } = stock;

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl error={ Boolean(error.category) } fullWidth>
                                <InputLabel>Vendor</InputLabel>
                                <Select
                                    value={ error.vendor }
                                    onChange={ handleChangeStock }
                                    inputProps={{
                                        name: 'vendor'
                                    }}
                                    fullWidth
                                >
                                    
                                </Select>
                                <FormHelperText>{ error.vendor || '' }</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                name='in_stock'
                                label='In stock'
                                value={ in_stock }
                                onChange={ handleChangeStock }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                name='minimum_stock'
                                label='Minimum Stock'
                                value={ minimum_stock }
                                onChange={ handleChangeStock }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default TrackStock
