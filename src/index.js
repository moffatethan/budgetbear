import React from 'react'
import Layout from './layout'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import Login from './pages/login'
import PlaidLink from './pages/plaidLink';
import AuthRoute from './authRoute'
import NewGoal from './pages/newGoal';
import { AuthProvider } from './contexts/authContext'
import { AuthAxiosProvider } from './contexts/authAxios'

const App = () => (
	<Router>
		<AuthProvider>
			<AuthAxiosProvider>
				<Layout>
					<Switch>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<AuthRoute exact path="/dashboard">
							<Dashboard />
						</AuthRoute>
						<AuthRoute exact path="/dashboard/plaid/link">
							<PlaidLink />
						</AuthRoute>
						<AuthRoute exact path="/goals/new">
							<NewGoal />
						</AuthRoute>
					</Switch>
				</Layout>
			</AuthAxiosProvider>
		</AuthProvider>
	</Router>
)

ReactDOM.render(<App />, document.querySelector('#root'))
