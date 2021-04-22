/** Libraries */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

/** Module Reducers */
import alertReducer from './modules/alert/reducer'
import authReducer from './modules/auth/reducer'
import chartOfAccountTypeReducer from './modules/chart-of-account-type/reducer'
import chartOfAccountReducer from './modules/chart-of-account/reducer'
import mainLayoutReducer from './modules/main-layout/reducer'


const rootReducer = (history) => combineReducers({
    /** Global reducers */
    router: connectRouter(history),
    alert: alertReducer,

    /** reducers */
    auth: authReducer,
    mainLayout: mainLayoutReducer,
    chartOfAccountType: chartOfAccountTypeReducer,
    chartOfAccount: chartOfAccountReducer,
});

export default rootReducer;