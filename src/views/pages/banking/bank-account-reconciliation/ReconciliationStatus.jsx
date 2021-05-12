import React from 'react'
import Button from '@material-ui/core/Button'

const ReconciliationStatus = ({ status = 'Unreconciled', text = null }) => 
{
    let backgroundColor = '#FFF';

    switch (status) {
        case 'Unreconciled':
            backgroundColor = '#f44336';
            break;

        case 'Reconciled':
            backgroundColor = '#4caf50'
            break;
    }

    return <Button 
        size='small'
        variant='contained' 
        color='default'
        style={{ 
            color: '#FFF',
            backgroundColor
        }}
        disabled
    >
        { text ?? status }
    </Button>
}

export default ReconciliationStatus
