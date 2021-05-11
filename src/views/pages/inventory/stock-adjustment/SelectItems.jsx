import React,{ useState, useEffect } from 'react'
import { MTableBody } from 'material-table';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

/** Actions */
import * as ITEM from '../../../../redux/modules/item/actions'
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Selectors */
import { selectItem } from '../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Material UI Components */
import { FormControl, Grid, TextField } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';

/** Material UI Icons */
import AddCircleIcon from '@material-ui/icons/AddCircle';

/** Components */
import AlertPopUp from '../../../../components/AlertPopUp';
import MaterialTable from '../../../../components/MaterialTable'


const SelectItems = ({ alert, itemProp, items, setItems, reason }) => 
{
    const dispatch = useDispatch();

    const [ selectItem, setSelectItem ] = useState(0);

    const columns = [
        { field: 'stock_id', hidden: true },
        { title: 'Item', field: 'item' },
        { 
            title: 'Book Quantity', 
            field: 'book_quantity',
            cellStyle: {
                textAlign: 'center'
            }
        },
        { 
            title: 'Quantity', 
            field: 'quantity',
            render: ({ quantity, tableData }) => (
                <TextField
                    value={ quantity }
                    onChange={ e => handleChangeQuantity(e, tableData.id) }
                    inputProps={{ style: { textAlign: 'center' } }}
                />
            )
        },
        { 
            title: 'Physical Quantity', 
            field: 'physical_quantity',
            cellStyle: {
                textAlign: 'center'
            }
        },
        { title: 'Unit price', field: 'unit_price' },
        { title: 'Amount', field: 'amount' }
    ];

    const options = {
        selection: false,
        search: false,
        actionsColumnIndex: -1
    };

    const actions = [
        {
            icon: DeleteIcon,
            tooltip: 'Delete',
            onClick: (event, { tableData }) => handleClickDeleteItem(tableData.id)
        }
    ];

    const handleChangeQuantity = (e, index) => 
    {
        const items_ = [ ...items ];
        const quantity = parseInt(e.target.value) || 0;

        const quantityExceedBookQuantity = (quantity > items_[index].book_quantity);

        if (quantityExceedBookQuantity && (reason === 'Loss items' || reason === 'Damaged items')) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'Quantity exceeded the item\'s current stock'
            }));
        }
        else {

            const price = items_[index].unit_price;
            const bookQuantity = items_[index].book_quantity;

            let newPhysicalQuantity = 0;
            let newAmount = 0;

            switch (reason) {
                case 'Received items':
                    newPhysicalQuantity = (bookQuantity + quantity)
                    newAmount = newPhysicalQuantity * price;
                    break;

                case 'Loss items':
                case 'Damaged items':
                    newPhysicalQuantity = (bookQuantity - quantity)
                    newAmount = newPhysicalQuantity * price;
                    break;

                case 'Inventory count':
                    newPhysicalQuantity = quantity;
                    newAmount = quantity * price;
                    break;
            }

            items_[index].quantity = quantity;
            items_[index].physical_quantity = newPhysicalQuantity;
            items_[index].amount = newAmount.toFixed(2);

            setItems(items_);
        }
    }

    const handleClickDeleteItem = (index) => {
        const items_ = [...items];

        items_.splice(index, 1);

        setItems(items_);
    };

    const handleChangeItem = (e) => 
    {
        const itemIsSelected = items.find(({ item_id }) => item_id === e.target.value);

        if (!itemIsSelected) {
            const { id: item_id, name: item, category, stock, price } = itemProp.items.find(({ id }) => id === e.target.value);

            setItems([ ...items, {
                stock_id: stock.id,
                item,
                book_quantity: stock.in_stock,
                quantity: 0,
                physical_quantity: stock.in_stock,
                unit_price: price,
                amount: ( price * stock.in_stock ).toFixed(2)
            }]);
    
            setSelectItem(0);
        }
        else {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'The item is already added'
            }));
        }
    };

    const resetItem = () => 
    {
        let items_ = [...items];

        items_ = items_.map(({ book_quantity, unit_price, ...item }) => ({ 
            ...item, 
            quantity: 0,
            book_quantity,
            unit_price,
            physical_quantity: book_quantity,
            amount: (book_quantity * unit_price).toFixed(2)
        }));

        setItems(items_);
    }

    const onLoadFetchItems = () => dispatch(ITEM.getItems({ hasStocks: true }));

    useEffect(() => {
        onLoadFetchItems();
    }, []);

    useEffect(() => {
        resetItem();
    }, [reason]);

    return (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        actions={ actions }
                        columns={ columns }      
                        data={ items }  
                        options={ options }
                        title='Items'
                        components={{ 
                            Body: props => items.length > 0 && <MTableBody { ...props } />
                        }}
                    />  
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <Select
                            IconComponent={ AddCircleIcon }
                            value={ selectItem }
                            onChange={ handleChangeItem }
                            fullWidth
                        >
                            {
                                itemProp.items.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                            }
                        </Select>
                    </FormControl> 
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    itemProp: selectItem
});

export default connect(mapStateToProps, null)(SelectItems)
