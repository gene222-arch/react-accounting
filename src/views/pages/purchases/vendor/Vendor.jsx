import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectVendor } from '../../../../redux/modules/vendor/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectUser } from '../../../../redux/modules/auth/selector';

/** Actions */
import * as VENDOR from '../../../../redux/modules/vendor/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** File saver */
import { generateVendorExcelAsync } from './../../../../services/exports/excel/vendor';
import { generateVendorCSVAsync } from './../../../../services/exports/csv/vendor';

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles, Grid } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from '../../../../components/AlertPopUp';
import ImportExportActions from '../../../../components/ImportExportActions';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';

import PATH from '../../../../routes/path';

const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const Vendor = ({ alert, userProp, vendorProp }) => 
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
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_VENDOR.replace(':id', id)} text={ name } />
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

    const handleClickExportVendorExcel = () => generateVendorExcelAsync(userProp.email);
    
    const handleClickExportVendorCSV = () => generateVendorCSVAsync(userProp.email);

    const onSelectionChange = (rows) => setIds(rows.map(({ id }) => id));

    const onLoadFetchAll = () => dispatch(VENDOR.getVendors());

    const handleClickDestroy = () => {
        dispatch(VENDOR.destroyVendors({ ids }));
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
                        title='Vendors'
                        handleClickExportExcel={ handleClickExportVendorExcel }
                        handleClickExportCSV={ handleClickExportVendorCSV }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }      
                        data={ vendorProp.vendors }  
                        isLoading={ vendorProp.isLoading }
                        onSelectionChange={ rows => onSelectionChange(rows) }
                        title={ 
                            <ActionButton 
                                classes={ classes } 
                                ids={ ids } 
                                handleClickRedirect = { () => history.push(PATH.CREATE_VENDOR) }
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
    vendorProp: selectVendor,
    userProp: selectUser
});

export default connect(mapStateToProps, null)(Vendor)