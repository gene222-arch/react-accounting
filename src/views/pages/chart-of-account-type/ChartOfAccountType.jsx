import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../components/MaterialTable'

/** Selectors */
import { selectChartOfAccountType } from './../../../redux/modules/chart-of-account-type/selector';
import * as CHART_OF_ACCOUNT_TYPE from './../../../redux/modules/chart-of-account-type/actions';

/** Material UI Components */
import Button from '@material-ui/core/Button'

/** Material UI Icons */
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';



const ActionButton = ({ ids }) => !ids.length 
    ? <Button variant="text" color="default"> <AddBoxIcon /> </Button>
    : <Button variant="text" color="default"> <DeleteIcon /> </Button>

const ChartOfAccountType = ({ chartOfAccountType }) => 
{
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([])
    const [ id, setId ] = useState({ id: 0 });
    const [ chartOfAccountTypeState, setChartOfAccountTypeState ] = useState(chartOfAccountType.chartOfAccountType);

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'Category', field: 'category' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(CHART_OF_ACCOUNT_TYPE.getChartOfAccountTypes());

    const handleClickUpdate = () => dispatch(CHART_OF_ACCOUNT_TYPE.updateChartOfAccountType(chartOfAccountTypeState));

    const handleClickDestroy = () => dispatch(CHART_OF_ACCOUNT_TYPE.destroyChartOfAccountType({ ids }));

    useEffect(() => {
        onLoadFetchAll();
    }, []);

    return (
        <div>
            <MaterialTable
                columns={ columns }      
                data={ chartOfAccountType.chartOfAccountTypes }  
                isLoading={ chartOfAccountType.isLoading }
                onSelectionChange={ rows => console.log(rows) }
                title={ <ActionButton ids={ ids } /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    chartOfAccountType: selectChartOfAccountType
});

export default connect(mapStateToProps, null)(ChartOfAccountType)
