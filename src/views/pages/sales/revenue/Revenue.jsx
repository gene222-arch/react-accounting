import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectRevenue } from '../../../../redux/modules/revenue/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectUser } from '../../../../redux/modules/auth/selector';

/** Actions */
import * as REVENUE from '../../../../redux/modules/revenue/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** File saver */
import { generateRevenueExcelAsync } from './../../../../services/exports/excel/revenue';
import { generateRevenueCSVAsync } from './../../../../services/exports/csv/revenue';

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles, Grid } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import ImportExportActions from '../../../../components/ImportExportActions';

import PATH from '../../../../routes/path';


const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const Revenue = ({ alert, userProp, revenueProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Date', 
            field: 'date', 
            render: ({ id, date }) => <StyledNavLink to={ PATH.UPDATE_REVENUE.replace(':id', id) } text={ date } />
        },
        { 
            title: 'Amount', 
            field: 'amount', 
        },
        { 
            title: 'Customer', 
            field: 'customer', 
        },
        { 
            title: 'Category', 
            field: 'category', 
        },
        { 
            title: 'Account', 
            field: 'account', 
        },
    ];

    const handleClickExportRevenuesExcel = () => generateRevenueExcelAsync(userProp.email);
    
    const handleClickExportRevenuesCSV = () => generateRevenueCSVAsync(userProp.email);

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(REVENUE.getRevenues());

    const handleClickDestroy = () => {
        dispatch(REVENUE.destroyRevenues({ ids }));
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
                        title='Invoices'
                        handleClickExportExcel={ handleClickExportRevenuesExcel }
                        handleClickExportCSV={ handleClickExportRevenuesCSV }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }      
                        data={ revenueProp.revenues }  
                        isLoading={ revenueProp.isLoading }
                        onSelectionChange={ rows => onSelectionChange(rows) }
                        title={ 
                            <ActionButton 
                                classes={ classes } 
                                ids={ ids } 
                                handleClickRedirect = { () => history.push(PATH.CREATE_REVENUE) }
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
    revenueProp: selectRevenue,
    userProp: selectUser
});

export default connect(mapStateToProps, null)(Revenue)