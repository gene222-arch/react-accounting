import React,{ useEffect } from 'react'
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as INCOME_CATEGORY from '../../../../../redux/modules/income-category/actions'


/** Selectors */
import { selectIncomeCategory } from './../../../../../redux/modules/income-category/selector';
import { connect, useDispatch } from 'react-redux';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';


const RECURRINGS = [
    'No',
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly'
];

const RecurringAndMore = ({ incomeCategoryProp, invoiceState, handleChange }) => 
{
    const dispatch = useDispatch();

    const onLoadFetchIncomeCategories = () => dispatch(INCOME_CATEGORY.getIncomeCategories());

    useEffect(() => {
        onLoadFetchIncomeCategories();
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel>Recurring</InputLabel>
                        <Select
                            name='recurring'
                            value={ invoiceState.recurring }
                            onChange={ handleChange }
                        >
                            {
                                RECURRINGS.map((recurring, index) => (
                                    <MenuItem key={ index } value={ recurring }>
                                        { recurring !== 'No' ? recurring : <strong>{ recurring }</strong> }    
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name='income_category_id'
                            value={ invoiceState.income_category_id }
                            onChange={ handleChange }
                        >
                            {
                                incomeCategoryProp.incomeCategories.map(({ id, name }, index) => (
                                    <MenuItem key={ id } value={ id }>
                                        { id !== 1 ? name : <strong>{ name }</strong> }
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    incomeCategoryProp: selectIncomeCategory
});

export default connect(mapStateToProps, null)(RecurringAndMore)
