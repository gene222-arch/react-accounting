import React,{ useEffect } from 'react'
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as EXPENSE_CATEGORY from '../../../../../redux/modules/expense-category/actions'


/** Selectors */
import { selectExpenseCategory } from '../../../../../redux/modules/expense-category/selector';
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

const RecurringAndMore = ({ expenseCategoryProp, billState, handleChange }) => 
{
    const dispatch = useDispatch();

    const onLoadFetchExpenseCategories = () => dispatch(EXPENSE_CATEGORY.getExpenseCategories());

    useEffect(() => {
        onLoadFetchExpenseCategories();
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel>Recurring</InputLabel>
                        <Select
                            name='recurring'
                            value={ billState.recurring }
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
                            name='expense_category_id'
                            value={ billState.expense_category_id }
                            onChange={ handleChange }
                        >
                            {
                                expenseCategoryProp.expenseCategories.map(({ id, name }, index) => (
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
    expenseCategoryProp: selectExpenseCategory
});

export default connect(mapStateToProps, null)(RecurringAndMore)
