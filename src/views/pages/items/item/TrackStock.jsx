import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as VENDOR from './../../../../redux/modules/vendor/actions';

/** Selectors */
import { selectVendor } from './../../../../redux/modules/vendor/selector';

/** Material UI Components */
import { Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const TrackStock = ({ vendorProp, stockState, handleChangeStock, error }) => 
{
    const dispatch = useDispatch();

    const onLoadFetchVendors = () => dispatch(VENDOR.getVendors());

    useEffect(() => {
        onLoadFetchVendors();
    }, []);
    
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl error={ Boolean(error.vendor_id) } fullWidth>
                                <InputLabel>Vendor</InputLabel>
                                <Select
                                    value={ stockState?.vendor_id }
                                    onChange={ handleChangeStock }
                                    inputProps={{
                                        name: 'vendor_id'
                                    }}
                                    fullWidth
                                >
                                    {
                                        vendorProp.vendors.map(({ id, name }) => (
                                            <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                        ))
                                    }
                                </Select>
                                <FormHelperText>{ error.vendor_id || '' }</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                name='in_stock'
                                label='In stock'
                                value={ stockState?.in_stock }
                                onChange={ handleChangeStock }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                name='minimum_stock'
                                label='Minimum Stock'
                                value={ stockState?.minimum_stock }
                                onChange={ handleChangeStock }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    vendorProp: selectVendor
});

export default connect(mapStateToProps, null)(TrackStock)
