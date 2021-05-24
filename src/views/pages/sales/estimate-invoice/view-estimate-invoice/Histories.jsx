import React from 'react'
import MaterialTable from './../../../../../components/MaterialTable';

const Histories = ({ histories }) => 
{
    const columns = [
        { field: 'id', hidden: true },
        { title: 'Date', field: 'created_at' },
        { title: 'Status', field: 'status' },
        { title: 'Description', field: 'description' }
    ];

    const options = {
        selection: false,
        search: false
    };

    return (
        <>
            <MaterialTable 
                columns={ columns }      
                data={ histories }  
                options={ options }
                title='Histories'
            />
        </>
    )
}

export default Histories
