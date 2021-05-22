import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectUser } from '../../../../redux/modules/auth/selector';
import { selectItem } from './../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** API */
import { generateItemExcelAsync } from './../../../../services/exports/excel/item';
import { generateItemCSVAsync } from './../../../../services/exports/csv/item';

/** Actions */
import * as ITEM from './../../../../redux/modules/item/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles, Grid } from '@material-ui/core';

/** Components */
import AddButton from './../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from './../../../../components/AlertPopUp';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import ImportExportActions from '../../../../components/ImportExportActions';

import PATH from './../../../../routes/path';


const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const Item = ({ alert, userProp, itemProp }) => 
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

    const handleClickExportItemsExcel = () => generateItemExcelAsync(userProp.email);

    const handleClickExportItemsCSV = () => generateItemCSVAsync(userProp.email);

    const onSelectionChange = (rows) => setIds(rows.map(({ id }) => id));

    const onLoadFetchAll = () => dispatch(ITEM.getItems({ includeStockTable: false }));

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
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ImportExportActions 
                        title='Items'
                        handleClickExportExcel={ handleClickExportItemsExcel }
                        handleClickExportCSV={ handleClickExportItemsCSV }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
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
                </Grid>
            </Grid>
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    itemProp: selectItem,
    userProp: selectUser,
});

export default connect(mapStateToProps, null)(Item)