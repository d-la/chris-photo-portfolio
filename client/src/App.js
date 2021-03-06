import React, { Component } from 'react';
import './css/styles.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Login from './components/Login';

// Admin backend
import Admin from './containers/Admin';
import Dashboard from './components/Dashboard';

class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={Welcome} />
				<Route path="/contact" component={Contact} />
				<Route path="/people-ive-met" render={(props) => <Gallery categoryId={1} categoryName="People I've Met" />} />
				<Route path="/the-world-around-me" render={(props) => <Gallery categoryId={2} categoryName="The World Around Me" />} />
				<Route path="/on-the-road" render={(props) => <Gallery categoryId={3} categoryName="On the Road" />} />
				<Route path="/login" component={Login} />
				<Route path="/admin/dashboard" render={ (props) => <Admin mainComponent={<Dashboard />} /> } />
			</Router>
		);
	}
}

export default App;
