import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectCustomer } from '../../../../redux/modules/customer/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as CUSTOMER from '../../../../redux/modules/customer/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';


const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const Customer = ({ alert, customer }) => 
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
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_CUSTOMER.replace(':id', id)} text={ name } />
        },
        { 
            title: 'Email', 
            field: 'email', 
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

    const onLoadFetchAll = () => dispatch(CUSTOMER.getCustomers());

    const handleClickDestroy = () => {
        dispatch(CUSTOMER.destroyCustomers({ ids }));
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
                data={ customer.customers }  
                isLoading={ customer.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_CUSTOMER) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    customer: selectCustomer
});

export default connect(mapStateToProps, null)(Customer)