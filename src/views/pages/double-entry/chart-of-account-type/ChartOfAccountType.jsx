import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectChartOfAccountType } from './../../../../redux/modules/chart-of-account-type/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as CHART_OF_ACCOUNT_TYPE from './../../../../redux/modules/chart-of-account-type/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Icons */
import AddButton from './../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from './../../../../components/AlertPopUp';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';

import PATH from '../../../../routes/path'


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />

const ChartOfAccountType = ({ alert, chartOfAccountType }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [ ids, setIds ] = useState([])
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Category', 
            field: 'category',
            render: row => <StyledNavLink to={ PATH.UPDATE_CHART_OF_ACCOUNT_TYPE.replace(':id', row.id) } text={ row.category } /> 
        },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(CHART_OF_ACCOUNT_TYPE.getChartOfAccountTypes());

    const handleClickDestroy = () => {
        dispatch(CHART_OF_ACCOUNT_TYPE.destroyChartOfAccountTypes({ ids }));
        setIds([]);
    }

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
                data={ chartOfAccountType.chartOfAccountTypes }  
                isLoading={ chartOfAccountType.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                    ids={ ids } 
                    handleClickRedirect = { () => history.push(PATH.CREATE_CHART_OF_ACCOUNT_TYPE) }
                    handleClickDestroy={ handleClickDestroy }
                /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    chartOfAccountType: selectChartOfAccountType
});

export default connect(mapStateToProps, null)(ChartOfAccountType)
