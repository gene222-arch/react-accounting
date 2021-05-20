import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectItem } from './../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as ITEM from './../../../../redux/modules/item/actions';
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


const Item = ({ alert, itemProp }) => 
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
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_ITEM.replace(':id', id)} text={ name } />
        },
        { title: 'Category', field: 'category' },
        { title: 'Price', field: 'price' },
        { title: 'Purchase price', field: 'cost' },
        { 
            title: 'Enabled', 
            field: 'is_for_sale',
            render: ({ is_for_sale }) => (
                <Switch
                    checked={ Boolean(is_for_sale) }
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            )
        },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => {
        if (!itemProp.items.length) {
            dispatch(ITEM.getItems({ includeStockTable: false }));
        }
    }

    const handleClickDestroy = () => {
        dispatch(ITEM.destroyItems({ ids }));
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
                data={ itemProp.items }  
                isLoading={ itemProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_ITEM) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    itemProp: selectItem
});

export default connect(mapStateToProps, null)(Item)