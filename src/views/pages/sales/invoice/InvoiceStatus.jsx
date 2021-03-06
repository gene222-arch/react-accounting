import React from 'react'
import Button from '@material-ui/core/Button'

const InvoiceStatus = ({ status = 'Draft', text = null }) => 
{
    let backgroundColor = '#FFF';

    switch (status) {
        case 'Cancelled':
            backgroundColor = '#2c2c2c';
            break;

        case 'Draft': 
            backgroundColor = '#90caf9';
            break;

        case 'Partially Paid':
            backgroundColor = '#2196f3';
            break;

        case 'Paid':
            backgroundColor = '#4caf50'
            break;

        case 'Sent':
            backgroundColor = '#4caf50'

        case 'Over due': 
            backgroundColor = '#B33A3A'
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

export default InvoiceStatus
