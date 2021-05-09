import React,{ useState, useEffect } from 'react'
import { MTableBody } from 'material-table';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

/** Actions */
import * as ITEM from '../../../../../redux/modules/item/actions'
import * as ALERT from '../../../../../redux/modules/alert/actions'

/** Selectors */
import { selectItem } from './../../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';

/** Material UI Components */
import { FormControl, Grid, TextField } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';

/** Material UI Icons */
import AddCircleIcon from '@material-ui/icons/AddCircle';

/** Components */
import AlertPopUp from '../../../../../components/AlertPopUp';
import MaterialTable from '../../../../../components/MaterialTable'


const SelectItems = ({ discount, discounts, tax, taxes, alert, itemProp, items, setItems, paymentDetailState, setPaymentDetailState }) => 
{
    const dispatch = useDispatch();

    const [ selectItem, setSelectItem ] = useState(0);

    const columns = [
        { field: 'item_id', hidden: true },
        { title: 'Item', field: 'item' },
        { 
            title: 'Quantity', 
            field: 'quantity', 
            type: 'numeric',
            render: ({ quantity, tableData }) => <TextField
                onChange={e => handleChangeQuantity(e, tableData.id)}
                value={ quantity }
                inputProps={{ style: { textAlign: 'right' } }}
            />
        },
        { 
            title: 'Price', 
            field: 'price', 
            type: 'numeric',
        },
        { 
            title: 'Amount', 
            field: 'amount', 
            type: 'numeric',
            editable: 'never',
            emptyValue: 0,
            render: ({ quantity, price }) => (quantity * price).toFixed(2)
        },
    ];

    const options = {
        selection: false,
        search: false
    };

    const actions = [
        {
            icon: DeleteIcon,
            tooltip: 'Delete',
            onClick: (event, { tableData }) => handleClickDeleteItem(tableData.id)
        }
    ];

    const updatePaymentDetails = () => 
    {
        const DISCOUNT_RATE = discounts[discount.id]?.rate / 100;
        const TAX_RATE = taxes[tax.id]?.rate/ 100;

        const subTotal = items.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2);
        let total = parseFloat(items.reduce((total, item) => total + item.amount, 0));

        const totalDiscount = DISCOUNT_RATE * total;
        const totalTax = TAX_RATE * total;

        total += totalTax - totalDiscount;
        
        setPaymentDetailState({
            ...paymentDetailState,
            sub_total: subTotal,
            total,
            total_discounts: totalDiscount.toFixed(2),
            total_taxes: totalTax.toFixed(2),
            amount_due: total,
        });
    }

    const handleChangeQuantity = (e, index) => 
    {
        const items_ = [ ...items ];
        const quantity = parseInt(e.target.value) || 0;

        const findItem = itemProp.items.find(({ id }) => id === items_[index].item_id);
        const inputQtyExceedInStock = findItem.stock.in_stock < quantity;

        if (inputQtyExceedInStock) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'Quantity exceeded the item\'s current stock'
            }));
        }
        else {
            items_[index].quantity = quantity;
            items_[index].amount = parseFloat(items_[index].price) * quantity;

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
            const { id: item_id, name: item, price } = itemProp.items.find(({ id }) => id === e.target.value);

            setItems([ ...items, {
                item_id,
                item,
                price,
                quantity: 1,
                amount: price
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

    const onLoadFetchItems = () => dispatch(ITEM.getItems({ isForSale: true, hasStocks: true }));

    useEffect(() => {
        onLoadFetchItems();
    }, []);

    useEffect(() => {
        updatePaymentDetails();
    }, [items]);

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
