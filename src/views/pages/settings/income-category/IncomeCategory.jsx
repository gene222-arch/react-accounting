import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectIncomeCategory } from './../../../../redux/modules/income-category/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as INCOME_CATEGORY from './../../../../redux/modules/income-category/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from './../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from './../../../../components/AlertPopUp';

import PATH from './../../../../routes/path';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';


const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const IncomeCategory = ({ alert, incomeCategory }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name', 
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_INCOME_CATEGORY.replace(':id', id)} text={ name } />
        },
        { 
            title: 'Hex code', 
            field: 'hex_code', 
        },
        { 
            title: 'Enabled', 
            field: 'enabled',
            render: ({ enabled }) => (
                <Switch
                    checked={ Boolean(enabled) }
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            )
        },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => {
        dispatch(INCOME_CATEGORY.getIncomeCategories())
        console.log(incomeCategory)
    };

    const handleClickDestroy = () => {
        dispatch(INCOME_CATEGORY.destroyIncomeCategories({ ids }));
        setIds([]);
    };

    useEffect(() => {
        onLoadFetchAll();
    }, []);

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <MaterialTable
                columns={ columns }      
                data={ incomeCategory.incomeCategories }  
                isLoading={ incomeCategory.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_INCOME_CATEGORY) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    incomeCategory: selectIncomeCategory
});

export default connect(mapStateToProps, null)(IncomeCategory)