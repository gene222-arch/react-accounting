import React,{ useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectAlert } from '../../../../../redux/modules/alert/selector';

/** Actions */
import * as ALERT from '../../../../../redux/modules/alert/actions'

/** Material UI Components */
import { FormHelperText, Table, TableBody, TableContainer, TableRow } from '@material-ui/core'
import MuiTableCell from '@material-ui/core/TableCell'
import { withStyles, makeStyles } from '@material-ui/core'
import { FormControl, MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select';

/** Components */
import AlertPopUp from '../../../../../components/AlertPopUp';


const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

const PaymentDetail = ({ 
    alert,
    currencies,
    discounts,
    taxes,
    currency,
    setCurrency,
    discount, 
    setDiscount, 
    items, 
    setItems, 
    paymentDetailState, 
    setPaymentDetailState, 
    tax, 
    setTax}) => 
{
    const dispatch = useDispatch();

    const handleChangeCurrency = (e) => 
    {
        if (!items.length) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'Please select an item first'
            }))
        }
        else {
            const id = e.target.value;

            const findCurrency = currencies.find(currency => currency.id === id);
            
            setCurrency(findCurrency);
        }
    };

    const handleChangeDiscount = (e) => 
    {
        if (!items.length) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'Please select an item first'
            }))
        }
        else {
            const id = e.target.value;

            const findDiscount = discounts.find(discount => discount.id === id);
            const totalDiscounts = ((findDiscount.rate / 100) * paymentDetailState.sub_total);
    
            setDiscount(findDiscount);
    
            setPaymentDetailState({ 
                ...paymentDetailState, 
                total_discounts: totalDiscounts
            });
    
            const items_ = items.map(item => ({ 
                ...item, 
                discount_id: id, 
                discount: ((findDiscount.rate / 100) * item.amount)
            }));
    
            setItems(items_);
        }
    };

    const handleChangeTax = (e) => 
    {
        if (!items.length) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'Please select an item first'
            }))
        }
        else {
            const id = e.target.value;

            const findTax = taxes.find(tax => tax.id === id);
            const totalTax = ((findTax.rate / 100) * paymentDetailState.sub_total);
    
            setTax(findTax);
    
            setPaymentDetailState({ 
                ...paymentDetailState, 
                total_taxes: totalTax
            });
    
            const items_ = items.map(item => ({ 
                ...item, 
                tax_id: id, 
                tax: ((findTax.rate / 100) * item.amount)
            }));
    
            setItems(items_);
        }
    };

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <TableContainer>
                <Table aria-label="spanning table">
                    <TableBody>
                        <TableRow>
                            <TableCell align="right"><strong>Subtotal</strong></TableCell>
                            <TableCell align="right">{ (paymentDetailState.sub_total) } </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">
                                <FormControl fullWidth>
                                    <Select
                                        value={ tax.id }
                                        onChange={ handleChangeTax }
                                        fullWidth
                                        label='Add tax'
                                    >
                                        {
                                            taxes.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>  
                            </TableCell>
                            <TableCell align="right">{ (paymentDetailState.total_taxes) }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">
                                <FormControl fullWidth>
                                    <Select
                                        value={ discount.id }
                                        onChange={ handleChangeDiscount }
                                        fullWidth
                                        label='Add discount'
                                    >
                                        {
                                            discounts.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>                            
                            </TableCell>
                            <TableCell align="right">{ (paymentDetailState.total_discounts) } </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">
                                <FormControl fullWidth>
                                    <Select
                                        value={ currency.id }
                                        onChange={ handleChangeCurrency }
                                        fullWidth
                                    >
                                        {
                                            currencies.map(({ id, name }) => <MenuItem key={ id } value={ id }>{ name }</MenuItem>)
                                        }
                                    </Select>
                                </FormControl> 
                            </TableCell>
                            <TableCell align="right">{ (paymentDetailState.total) }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert
})

export default connect(mapStateToProps, null)(PaymentDetail);
