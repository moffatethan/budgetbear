import React from 'react'
import Layout from './layout'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Transactions from './pages/transactions'
import AuthGuard from './guard/AuthGuard'
import { AuthProvider } from './contexts/authContext'

const App = () => (
	<AuthProvider>
		<Router>
			<Layout>
				<Switch>
					<AuthGuard>
						<Route exact path="/">
							<Dashboard />
						</Route>
						<Route exact path="/transactions">
							<Transactions />
						</Route>
					</AuthGuard>
				</Switch>
			</Layout>
		</Router>
	</AuthProvider>
)

ReactDOM.render(<App />, document.querySelector('#root'))
