import React from 'react'
import Layout from './layout'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import Login from './pages/login'
import AuthRoute from './authRoute'
import { AuthProvider } from './contexts/authContext'

const App = () => (
	<Router>
		<AuthProvider>
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
				</Switch>
			</Layout>
		</AuthProvider>
	</Router>
)

ReactDOM.render(<App />, document.querySelector('#root'))
