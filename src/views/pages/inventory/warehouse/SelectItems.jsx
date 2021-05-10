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
import { FormControl, Grid } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';

/** Material UI Icons */
import AddCircleIcon from '@material-ui/icons/AddCircle';

/** Components */
import AlertPopUp from '../../../../components/AlertPopUp';
import MaterialTable from '../../../../components/MaterialTable'


const SelectItems = ({ alert, itemProp, items, setItems }) => 
{
    const dispatch = useDispatch();

    const [ selectItem, setSelectItem ] = useState(0);

    const columns = [
        { field: 'item_id', hidden: true },
        { title: 'Item', field: 'item' },
        { title: 'Category', field: 'category' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Price', field: 'price' },
        { title: 'Cost', field: 'cost' }
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


    const handleClickDeleteItem = (index) => {
        const items_ = [...items];

        items_.splice(index, 1);

        setItems(items_);
    };

    const handleChangeItem = (e) => 
    {
        const itemIsSelected = items.find(({ item_id }) => item_id === e.target.value);

        if (!itemIsSelected) {
            const { id: item_id, name: item, category, stock, price, cost, is_for_sale: enabled } = itemProp.items.find(({ id }) => id === e.target.value);

            setItems([ ...items, {
                item_id,
                stock_id: stock.id,
                item,
                category,
                quantity: stock.in_stock,
                price,
                cost,
                enabled
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

    const onLoadFetchItems = () => dispatch(ITEM.getItems());

    useEffect(() => {
        onLoadFetchItems();
    }, []);

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
