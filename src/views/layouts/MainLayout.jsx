import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom'
import clsx from 'clsx';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Material styles */
import { useTheme } from '@material-ui/core/styles';
import { mainLayoutUseStyles } from '../../assets/js/material-ui/materialUIStyles'

/** Material UI Components */
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

/** Material UI Icons */
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SettingsIcon from '@material-ui/icons/Settings';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';

/** Actions */
import * as AUTH from '../../redux/modules/auth/actions'
import * as MAIN_LAYOUT from '../../redux/modules/main-layout/actions'

/** Selectors */
import { selectAuth } from './../../redux/modules/auth/selector';
import { selectMainLayout } from '../../redux/modules/main-layout/selector';

/** Components */
import Dashboards from './main-layout-drawer-list/Dashboards';
import DoubleEntry from './main-layout-drawer-list/DoubleEntry';
import Items from './main-layout-drawer-list/Items';
import Inventory from './main-layout-drawer-list/Inventory';
import Sales from './main-layout-drawer-list/Sales';
import Purchases from './main-layout-drawer-list/Purchases';
import Banking from './main-layout-drawer-list/Banking';
import Payroll from './main-layout-drawer-list/Payroll';
import Header from './main-layout-header/Header';



const MainLayout = ({ auth, children, mainLayout }) => 
{
    const dispatch = useDispatch();
    const classes = mainLayoutUseStyles();
    const theme = useTheme();

    const handleToggleDrawer = () => dispatch(MAIN_LAYOUT.toggleDrawer());

    const toggleDashboards = () => dispatch(MAIN_LAYOUT.toggleDashboards());

    const selectMainDashboard = () => dispatch(MAIN_LAYOUT.selectMainDashboard());

    const selectPayrollDashboard = () => dispatch(MAIN_LAYOUT.selectPayrollDashboard());

    const selectDoubleEntryDashboard = () => dispatch(MAIN_LAYOUT.selectDoubleEntryDashboard());

    const toggleDoubleEntry = () => dispatch(MAIN_LAYOUT.toggleDoubleEntry());

    const selectDoubleEntryChartOfAccount = () => dispatch(MAIN_LAYOUT.selectDoubleEntryChartOfAccount());

    const selectDoubleEntryChartOfAccountType = () => dispatch(MAIN_LAYOUT.selectDoubleEntryChartOfAccountType());

    const selectDoubleEntryJournalEntry = () => dispatch(MAIN_LAYOUT.selectDoubleEntryJournalEntry());

    const toggleItems = () => dispatch(MAIN_LAYOUT.toggleItems());

    const selectItemsItem = () => dispatch(MAIN_LAYOUT.selectItemsItem());

    const selectItemsCategory = () => dispatch(MAIN_LAYOUT.selectItemsCategory());
    
    const selectItemsDiscount = () => dispatch(MAIN_LAYOUT.selectItemsDiscount());

    const toggleInventory = () => dispatch(MAIN_LAYOUT.toggleInventory());

    const selectInventoryStockAdjustment = () => dispatch(MAIN_LAYOUT.selectInventoryStockAdjustment());

    const selectInventoryVendor = () => dispatch(MAIN_LAYOUT.selectInventoryVendor());
    
    const selectInventoryWarehouse = () => dispatch(MAIN_LAYOUT.selectInventoryWarehouse());

    const toggleSales = () => dispatch(MAIN_LAYOUT.toggleSales());

    const selectSalesDebitNote = () => dispatch(MAIN_LAYOUT.selectSalesDebitNote());

    const selectSalesInvoice = () => dispatch(MAIN_LAYOUT.selectSalesInvoice());
    
    const selectSalesEstimate = () => dispatch(MAIN_LAYOUT.selectSalesEstimate());

    const selectSalesRevenue = () => dispatch(MAIN_LAYOUT.selectSalesRevenue());
    
    const selectSalesCustomer= () => dispatch(MAIN_LAYOUT.selectSalesCustomer());

    const togglePurchases = () => dispatch(MAIN_LAYOUT.togglePurchases());

    const selectPurchasesCreditNote = () => dispatch(MAIN_LAYOUT.selectPurchasesCreditNote());

    const selectPurchasesBill = () => dispatch(MAIN_LAYOUT.selectPurchasesBill());

    const selectPurchasesPayment = () => dispatch(MAIN_LAYOUT.selectPurchasesPayment());

    const toggleBanking = () => dispatch(MAIN_LAYOUT.toggleBanking());

    const selectBankingAccount = () => dispatch(MAIN_LAYOUT.selectBankingAccount());

    const selectBankingTransfer = () => dispatch(MAIN_LAYOUT.selectBankingTransfer());
    
    const selectBankingTransaction = () => dispatch(MAIN_LAYOUT.selectBankingTransaction());

    const selectBankingReconciliation = () => dispatch(MAIN_LAYOUT.selectBankingReconciliation());

    const togglePayroll = () => dispatch(MAIN_LAYOUT.togglePayroll());
    
    const selectPayrollPayCalendar = () => dispatch(MAIN_LAYOUT.selectPayrollPayCalendar());

    const selectPayrollRunPayroll = () => dispatch(MAIN_LAYOUT.selectPayrollRunPayroll());

    const selectReports = () => dispatch(MAIN_LAYOUT.selectReports());

    const selectSettings = () => dispatch(MAIN_LAYOUT.selectSettings());

    const handleClickLogout = () => dispatch(AUTH.logoutStart());

    useEffect(() => {
        dispatch(AUTH.authUser());
    }, []);

    return auth.user && (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: mainLayout.drawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={ handleToggleDrawer }
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: mainLayout.drawer,
                        })}
                    >
                        <FormatAlignRightIcon className={ classes.menuBarIcon }/>
                    </IconButton>
                    <Typography variant="h6" noWrap className={ classes.header }>
                        { mainLayout.currentSelectedItem }
                    </Typography>
                    <Header 
                        user={ auth.user } 
                        handleClickLogout={ handleClickLogout }
                    />
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: mainLayout.drawer,
                    [classes.drawerClose]: !mainLayout.drawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: mainLayout.drawer,
                        [classes.drawerClose]: !mainLayout.drawer,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={ handleToggleDrawer }>
                        {theme.direction === 'rtl' ? <FormatAlignRightIcon className={ classes.menuBarIcon }/> : <FormatAlignLeftIcon className={ classes.menuBarIcon }/>}
                    </IconButton>
                </div>

                <List className={ classes.drawerList }>
                    {/* Dashboards */}
                    <Dashboards 
                        openDashboards={ mainLayout.dashboards } 
                        mainDashboard={ mainLayout.mainDashboard }
                        payrollDashboard={ mainLayout.payrollDashboard }
                        doubleEntryDashboard= { mainLayout.doubleEntryDashboard }
                        toggleDashboards={ toggleDashboards }
                        selectMainDashboard= { selectMainDashboard }
                        selectPayrollDashboard= { selectPayrollDashboard }
                        selectDoubleEntryDashboard= { selectDoubleEntryDashboard }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />

                    {/* Double Entry */}
                    <DoubleEntry 
                        openDoubleEntry={ mainLayout.doubleEntry } 
                        doubleEntryChartOfAccount={ mainLayout.doubleEntryChartOfAccount }
                        doubleEntryChartOfAccountType={ mainLayout.doubleEntryChartOfAccountType }
                        doubleEntryJournalEntry={ mainLayout.doubleEntryJournalEntry }
                        toggleDoubleEntry={ toggleDoubleEntry }
                        selectDoubleEntryChartOfAccount= { selectDoubleEntryChartOfAccount }
                        selectDoubleEntryChartOfAccountType={ selectDoubleEntryChartOfAccountType }
                        selectDoubleEntryJournalEntry= { selectDoubleEntryJournalEntry }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />

                    {/* Items */}
                    <Items 
                        openItems={ mainLayout.items }
                        itemsItem={ mainLayout.itemsItem }
                        itemsCategory={ mainLayout.itemsCategory }
                        itemsDiscount={ mainLayout.itemsDiscount }
                        toggleItems={ toggleItems }  
                        selectItemsItem={ selectItemsItem }
                        selectItemsCategory= { selectItemsCategory }
                        selectItemsDiscount= { selectItemsDiscount }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />                

                    {/* Inventory */}
                    <Inventory 
                        openInventory={ mainLayout.inventory }
                        inventoryStockAdjustment={ mainLayout.inventoryStockAdjustment }
                        inventoryVendor={ mainLayout.inventoryVendor }
                        inventoryWarehouse={ mainLayout.inventoryWarehouse }
                        toggleInventory={ toggleInventory }  
                        selectInventoryStockAdjustment={ selectInventoryStockAdjustment }
                        selectInventoryVendor= { selectInventoryVendor }
                        selectInventoryWarehouse= { selectInventoryWarehouse }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />   

                    {/* Sales */}
                    <Sales 
                        openSales={ mainLayout.sales }
                        salesDebitNote={ mainLayout.salesDebitNote }
                        salesInvoice={ mainLayout.salesInvoice }
                        salesEstimateInvoice={ mainLayout.salesEstimateInvoice }
                        salesRevenue={ mainLayout.salesRevenue }
                        salesCustomer={ mainLayout.salesCustomer }
                        toggleSales={ toggleSales }  
                        selectSalesDebitNote={ selectSalesDebitNote }
                        selectSalesInvoice={ selectSalesInvoice }
                        selectSalesEstimate={ selectSalesEstimate }
                        selectSalesRevenue= { selectSalesRevenue }
                        selectSalesCustomer= { selectSalesCustomer }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />  

                    {/* Purchases */}
                    <Purchases 
                        openPurchases={ mainLayout.purchases }
                        purchasesCreditNote={ mainLayout.purchasesCreditNote }
                        purchasesBill={ mainLayout.purchasesBill }
                        purchasesPayment={ mainLayout.purchasesPayment }
                        togglePurchases={ togglePurchases }  
                        selectPurchasesBill={ selectPurchasesBill }
                        selectPurchasesCreditNote={ selectPurchasesCreditNote }
                        selectPurchasesPayment= { selectPurchasesPayment }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />  

                    {/* Banking */}
                    <Banking 
                        openBanking={ mainLayout.banking }
                        bankingAccount={ mainLayout.bankingAccount }
                        bankingTransfer={ mainLayout.bankingTransfer }
                        bankingTransaction={ mainLayout.bankingTransaction }
                        bankingReconciliation={ mainLayout.bankingReconciliation }
                        toggleBanking={ toggleBanking }  
                        selectBankingAccount={ selectBankingAccount }
                        selectBankingTransfer= { selectBankingTransfer }
                        selectBankingTransaction= { selectBankingTransaction }
                        selectBankingReconciliation= { selectBankingReconciliation }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />  

                    {/* Payroll */}
                    <Payroll 
                        openPayroll={ mainLayout.payroll }
                        payrollPayCalendar={ mainLayout.payrollPayCalendar }
                        payrollRunPayroll={ mainLayout.payrollRunPayroll }
                        togglePayroll={ togglePayroll }  
                        selectPayrollPayCalendar={ selectPayrollPayCalendar }
                        selectPayrollRunPayroll= { selectPayrollRunPayroll }
                        classes={ classes.collapseChildren }
                        permissions={ auth.permissions }
                    />  

                    {/* Reports */}
                    {
                        auth.permissions.includes('Can View Reports') && (
                            <ListItem button selected={ mainLayout.reports } onClick={ selectReports }>
                                <ListItemIcon>
                                    <EqualizerIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText primary={'Reports'} />
                            </ListItem>
                        )
                    }

                    {/* Settings */}
                    <ListItem button selected={ mainLayout.settings } onClick={ selectSettings }>
                        <ListItemIcon>
                            <SettingsIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary={'Settings'} />
                    </ListItem>
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                { children }
            </main>
            
        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    auth: selectAuth,
    mainLayout: selectMainLayout
});

export default connect(mapStateToProps, null)(MainLayout);