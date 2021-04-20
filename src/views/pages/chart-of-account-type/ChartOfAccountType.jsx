import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../components/MaterialTable'

/** Selectors */
import { selectChartOfAccountType } from './../../../redux/modules/chart-of-account-type/selector';
import * as CHART_OF_ACCOUNT_TYPE from './../../../redux/modules/chart-of-account-type/actions';


const ChartOfAccountType = ({ chartOfAccountType }) => 
{
    const dispatch = useDispatch();

    const options = {
        selection: true,
        actionsColumnIndex: -1
    };

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'Category', field: 'category' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
    ];

    useEffect(() => {
        dispatch(CHART_OF_ACCOUNT_TYPE.getChartOfAccountTypes());
    }, []);

    return (
        <div>
            <MaterialTable
                columns={ columns }      
                data={ chartOfAccountType.chartOfAccountTypes }  
                isLoading={ chartOfAccountType.isLoading }
                onSelectionChange={ rows => console.log(rows) }
                options={ options }
                title='Chart of account types'
                actions={[
                    {
                        icon: 'add',
                        onClick: (event, rowData) => {
                            console.log('Hello World!');
                        },
                        isFreeAction: true,
                        tooltip: 'Add Button',
                    }
                ]}
            />            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    chartOfAccountType: selectChartOfAccountType
});

export default connect(mapStateToProps, null)(ChartOfAccountType)
