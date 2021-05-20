import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectCurrency } from '../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as CURRENCY from '../../../../redux/modules/currency/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';



const taxUseStyles = makeStyles(theme => ({
}));

const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />

const Currency = ({ alert, currencyProp }) => 
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
            render: row => <StyledNavLink to={ PATH.UPDATE_CURRENCY.replace(':id', row.id) } text={ row.name }/>
        },
        { title: 'Rate', field: 'rate' },
        { title: 'Code', field: 'code' },
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

    const onLoadFetchAll = () => dispatch(CURRENCY.getCurrencies());

    const handleClickDestroy = () => {
        dispatch(CURRENCY.destroyCurrencies({ ids }));
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
                data={ currencyProp.currencies }  
                isLoading={ currencyProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_CURRENCY) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    currencyProp: selectCurrency
});

export default connect(mapStateToProps, null)(Currency)
