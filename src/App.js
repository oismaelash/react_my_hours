import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/SignupEmployeeForm';
import Signin from './components/SigninEmployeeForm';
import Test from './components/Test';

import './index.css';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Signin} />
				<Route path="/signup" component={Signup} />
				<Route path="/home" component={Home} />
				<Route path="/test" component={Test} />
			</Switch>
		</Router>
	)
}

export default App;