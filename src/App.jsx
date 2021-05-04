/** Libraries */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

/** Routes config */
import { PRIVATE_ROUTES, AUTH_ROUTES, EMAIL_VERIFICATION_ROUTES } from './routes'
import RenderRoutes from './routes/RenderRoutes'

/** Layouts */
import AuthLayout from './views/layouts/AuthLayout';
import MainLayout from './views/layouts/MainLayout';

/** Components */
import NotFound from './views/pages/errors/NotFound';


const App = ({ history }) => 
{
	return (
		<MuiPickersUtilsProvider utils={ DateFnsUtils }>
			<Switch>
				<Route path='/auth/:path?'>
					<AuthLayout>
						<RenderRoutes routes={ AUTH_ROUTES } />
					</AuthLayout>
				</Route>

				<Route path='/email/:path?'>
					<AuthLayout>
						<RenderRoutes routes={ EMAIL_VERIFICATION_ROUTES } />
					</AuthLayout>
				</Route>

				<Route path='/:path?'>
					<MainLayout>
						<RenderRoutes routes={ PRIVATE_ROUTES } />
					</MainLayout>
				</Route>

				<Route component={ NotFound } />
			</Switch>
		</MuiPickersUtilsProvider>
	)
}

export default React.memo(App);
