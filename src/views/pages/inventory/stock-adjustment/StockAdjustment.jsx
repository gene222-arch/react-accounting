import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectStockAdjustment } from '../../../../redux/modules/stock-adjustment/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as STOCK_ADJUSTMENT from '../../../../redux/modules/stock-adjustment/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import MaterialTable from '../../../../components/MaterialTable'
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';

/** Material UI Icons */
import VisibilityIcon from '@material-ui/icons/Visibility';

import PATH from '../../../../routes/path';

const warehouseUseStyles = makeStyles(theme => ({
    viewIcon: {
        '&:hover': {
            color: '#2196f3'
        }
    }
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const StockAdjustment = ({ alert, stockAdjustmentProp }) => 
{
    const history = useHistory();
    const classes = warehouseUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Adjustment #', 
            field: 'stock_adjustment_number', 
            render: ({ id, stock_adjustment_number }) => (
                <StyledNavLink 
                    to={ PATH.VIEW_STOCK_ADJUSTMENT.replace(':id', id)} 
                    text={ stock_adjustment_number } 
                />
            )
        },
        { 
            title: 'Date', 
            field: 'created_at', 
        },
        { 
            title: 'Reason', 
            field: 'reason', 
        },
        { 
            title: 'Quantity', 
            field: 'quantity'
        },
    ];

    const options = {
        selection: false,
        search: false,
        actionsColumnIndex: -1
    };

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(STOCK_ADJUSTMENT.getStockAdjustments());

    const handleClickDestroy = () => {
        dispatch(STOCK_ADJUSTMENT.destroyStockAdjustments({ ids }));
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
                options={ options }
                data={ stockAdjustmentProp.stockAdjustments }  
                isLoading={ stockAdjustmentProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_STOCK_ADJUSTMENT) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    stockAdjustmentProp: selectStockAdjustment
});

export default connect(mapStateToProps, null)(StockAdjustment)