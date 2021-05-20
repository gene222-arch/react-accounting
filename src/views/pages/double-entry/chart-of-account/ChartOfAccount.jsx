import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectChartOfAccount } from './../../../../redux/modules/chart-of-account/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as CHART_OF_ACCOUNT from './../../../../redux/modules/chart-of-account/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from './../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from './../../../../components/AlertPopUp';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';

import PATH from './../../../../routes/path';



const chartOfAccountUseStyles = makeStyles(theme => ({
}));

const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />

const ChartOfAccount = ({ alert, chartOfAccountProp }) => 
{
    const history = useHistory();
    const classes = chartOfAccountUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Type', 
            field: 'type',
            render: ({ id, type }) => <StyledNavLink to={ PATH.UPDATE_CHART_OF_ACCOUNT.replace(':id', id) } text={ type } /> 
        },
        { title: 'Code', field: 'code' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
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

    const onLoadFetchAll = () => dispatch(CHART_OF_ACCOUNT.getChartOfAccounts());

    const handleClickDestroy = () => {
        dispatch(CHART_OF_ACCOUNT.destroyChartOfAccounts({ ids }));
        setIds([]);
    };

    useEffect(() => {
        onLoadFetchAll();
    }, []);

    return (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <MaterialTable
                columns={ columns }      
                data={ chartOfAccountProp.chartOfAccounts }  
                isLoading={ chartOfAccountProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_CHART_OF_ACCOUNT) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    chartOfAccountProp: selectChartOfAccount
});

export default connect(mapStateToProps, null)(ChartOfAccount)
