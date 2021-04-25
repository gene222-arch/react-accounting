import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

/** Path */
import PATH from './path'

/** Lazy components */
const MainDashboard = lazy(() => import('../views/pages/dashboards/main/MainDashboard'))
const PayrollDashboard = lazy(() => import('../views/pages/dashboards/payroll/PayrollDashboard'))
const DoubleEntryDashboard = lazy(() => import('../views/pages/dashboards/double-entry/DoubleEntryDashboard'))
const EmailVerification = lazy(() => import('./../views/pages/auth/EmailVerification'))
const EmailVerified = lazy(() => import('./../views/pages/auth/EmailVerified'))
const ForgotPasswordForm = lazy(() => import('../views/pages/auth/ForgotPasswordForm'))
const LoginForm = lazy(() => import('../views/pages/auth/LoginForm'))
const NotFound = lazy(() => import('../views/pages/errors/NotFound'))
const PublicRoute = lazy(() => import('./PublicRoute'))
const PrivateRoute = lazy(() => import('./PrivateRoute'))
const RegistrationForm = lazy(() => import('../views/pages/auth/RegistrationForm'))
const ResetPasswordForm = lazy(() => import('../views/pages/auth/ResetPasswordForm'))
const ChartOfAccountType = lazy(() => import('../views/pages/double-entry/chart-of-account-type/ChartOfAccountType'))
const CreateChartOfAccountType = lazy(() => import('../views/pages/double-entry/chart-of-account-type/CreateChartOfAccountType'))
const UpdateChartOfAccountType = lazy(() => import('../views/pages/double-entry/chart-of-account-type/UpdateChartOfAccountType'))
const ChartOfAccount = lazy(() => import('../views/pages/double-entry/chart-of-account/ChartOfAccount'))
const CreateChartOfAccount = lazy(() => import('../views/pages/double-entry/chart-of-account/CreateChartOfAccount'))
const UpdateChartOfAccount = lazy(() => import('../views/pages/double-entry/chart-of-account/UpdateChartOfAccount'))
const JournalEntry = lazy(() => import('../views/pages/double-entry/journal-entry/JournalEntry'))
const CreateJournalEntry = lazy(() => import('../views/pages/double-entry/journal-entry/CreateJournalEntry'))
const UpdateJournalEntry = lazy(() => import('../views/pages/double-entry/journal-entry/UpdateJournalEntry'))
const Item = lazy(() => import('../views/pages/items/item/Item'))
const CreateItem = lazy(() => import('../views/pages/items/item/CreateItem'))
const UpdateItem = lazy(() => import('../views/pages/items/item/UpdateItem'))



export const AUTH_ROUTES = [
    {
        path: PATH.FORGOT_PASSWORD,
        key: 'ForgotPasswordForm',
        icon: '',
        exact: true,
        component: ForgotPasswordForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.LOGIN,
        key: 'LoginForm',
        icon: '',
        exact: true,
        component: LoginForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.REGISTER,
        key: 'RegistrationForm',
        icon: '',
        exact: true,
        component: RegistrationForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.RESET_PASSWORD,
        key: 'ResetPasswordForm',
        icon: '',
        exact: true,
        component: ResetPasswordForm,
        access: '',
        restricted: false
    },
];


export const EMAIL_VERIFICATION_ROUTES = [
    {
        path: PATH.EMAIL_VERIFICATION,
        key: 'EmailVerification',
        icon: '',
        exact: true,
        component: EmailVerification,
        access: '',
        restricted: true,
        
    },
    {
        path: PATH.EMAIL_VERIFIED,
        key: 'EmailVerified',
        icon: '',
        exact: true,
        component: EmailVerified,
        access: '',
        restricted: true,
        
    },
]


export const PRIVATE_ROUTES = [
    {
        path: PATH.MAIN_DASHBOARD,
        key: 'MainDashboard',
        icon: '',
        exact: true,
        component: MainDashboard,
        access: 'View Main Dashboard',
        restricted: true
    },
    {
        path: PATH.PAYROLL_DASHBOARD,
        key: 'PayrollDashboard',
        icon: '',
        exact: true,
        component: PayrollDashboard,
        access: 'View Payroll Dashboard',
        restricted: true
    },
    {
        path: PATH.DOUBLE_ENTRY_DASHBOARD,
        key: 'DoubleEntryDashboard',
        icon: '',
        exact: true,
        component: DoubleEntryDashboard,
        access: 'View Double Entry Dashboard',
        restricted: true
    },
    {
        path: PATH.CHART_OF_ACCOUNT_TYPE,
        key: 'ChartOfAccountType',
        icon: '',
        exact: true,
        component: ChartOfAccountType,
        access: 'Manage Chart of Account Types',
        restricted: true
    },
    {
        path: PATH.CREATE_CHART_OF_ACCOUNT_TYPE,
        key: 'CreateChartOfAccountType',
        icon: '',
        exact: true,
        component: CreateChartOfAccountType,
        access: 'Manage Chart of Account Types',
        restricted: true
    },
    {
        path: PATH.UPDATE_CHART_OF_ACCOUNT_TYPE,
        key: 'UpdateChartOfAccountType',
        icon: '',
        exact: true,
        component: UpdateChartOfAccountType,
        access: 'Manage Chart of Account Types',
        restricted: true
    },
    {
        path: PATH.CHART_OF_ACCOUNT,
        key: 'ChartOfAccount',
        icon: '',
        exact: true,
        component: ChartOfAccount,
        access: 'Manage Chart of Accounts',
        restricted: true
    },
    {
        path: PATH.CREATE_CHART_OF_ACCOUNT,
        key: 'CreateChartOfAccount',
        icon: '',
        exact: true,
        component: CreateChartOfAccount,
        access: 'Manage Chart of Accounts',
        restricted: true
    },
    {
        path: PATH.UPDATE_CHART_OF_ACCOUNT,
        key: 'UpdateChartOfAccount',
        icon: '',
        exact: true,
        component: UpdateChartOfAccount,
        access: 'Manage Chart of Accounts',
        restricted: true
    },
    {
        path: PATH.JOURNAL_ENTRY,
        key: 'JournalEntry',
        icon: '',
        exact: true,
        component: JournalEntry,
        access: 'Manage Journal Entries',
        restricted: true
    },
    {
        path: PATH.CREATE_JOURNAL_ENTRY,
        key: 'CreateJournalEntry',
        icon: '',
        exact: true,
        component: CreateJournalEntry,
        access: 'Manage Journal Entries',
        restricted: true
    },
    {
        path: PATH.UPDATE_JOURNAL_ENTRY,
        key: 'UpdateJournalEntry',
        icon: '',
        exact: true,
        component: UpdateJournalEntry,
        access: 'Manage Journal Entries',
        restricted: true
    },
    ,
    {
        path: PATH.ITEM,
        key: 'Item',
        icon: '',
        exact: true,
        component: Item,
        access: 'Manage Items',
        restricted: true
    },
    {
        path: PATH.CREATE_ITEM,
        key: 'CreateItem',
        icon: '',
        exact: true,
        component: CreateItem,
        access: 'Manage Items',
        restricted: true
    },
    {
        path: PATH.UPDATE_ITEM,
        key: 'UpdateItem',
        icon: '',
        exact: true,
        component: UpdateItem,
        access: 'Manage Items',
        restricted: true
    },
];


export const RenderRoutes = ({ routes }) => 
{
    return (
        <Switch>
            {
                routes.map(({ key, path, strict, exact, restricted, component: Component }) => (
                    <Route
                        key={ key }
                        path={ path }
                        strict={ strict }
                        exact={ exact }
                        render={ props => {
                            return restricted 
                                ? <PrivateRoute Component={ Component } { ...props }/>
                                : <PublicRoute Component={ Component } { ...props } />
                        }}
                    />
                ))
            }
            <Route component={NotFound} />
        </Switch>
    )
}