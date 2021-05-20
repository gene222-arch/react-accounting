import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectWarehouse } from '../../../../redux/modules/warehouse/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as WAREHOUSE from '../../../../redux/modules/warehouse/actions';
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


const Warehouse = ({ alert, warehouseProp }) => 
{
    const history = useHistory();
    const classes = warehouseUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const actions = [
        {
            icon: () => <VisibilityIcon className={ classes.viewIcon }/>,
            tooltip: 'View',
            onClick: (event, { id }) => history.push(PATH.VIEW_WAREHOUSE.replace(':id', id))
        }
    ];

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name', 
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_WAREHOUSE.replace(':id', id)} text={ name } />
        },
        { 
            title: 'Email', 
            field: 'email', 
        },
        { 
            title: 'Phone', 
            field: 'phone', 
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

    const options = {
        selection: false,
        search: false,
        actionsColumnIndex: -1
    };

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(WAREHOUSE.getWarehouses());

    const handleClickDestroy = () => {
        dispatch(WAREHOUSE.destroyWarehouses({ ids }));
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
                actions={ actions }
                columns={ columns }      
                options={ options }
                data={ warehouseProp.warehouses }  
                isLoading={ warehouseProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_WAREHOUSE) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    warehouseProp: selectWarehouse
});

export default connect(mapStateToProps, null)(Warehouse)