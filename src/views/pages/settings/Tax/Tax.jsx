import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectTax } from '../../../../redux/modules/tax/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as TAX from '../../../../redux/modules/tax/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';



const taxUseStyles = makeStyles(theme => ({
}));

const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />

const Tax = ({ alert, tax }) => 
{
    const history = useHistory();
    const classes = taxUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name',
            render: row => <StyledNavLink to={ PATH.UPDATE_TAX.replace(':id', row.id) } text={ row.name }/>
        },
        { title: 'Rate', field: 'rate' },
        { title: 'Type', field: 'type' },
        { 
            title: 'Enabled', 
            field: 'enabled',
            render: row => (
                <Switch
                    checked={ Boolean(row.enabled) }
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            )
        },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(TAX.getTaxes());

    const handleClickDestroy = () => {
        dispatch(TAX.destroyTaxes({ ids }));
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
                data={ tax.taxes }  
                isLoading={ tax.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_TAX) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    tax: selectTax
});

export default connect(mapStateToProps, null)(Tax)
