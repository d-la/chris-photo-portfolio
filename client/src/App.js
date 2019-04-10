import React, { Component } from 'react';
import './css/styles.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
import Gallery from './components/Gallery';

class App extends Component {
	render() {
		return (
			<Router>
				<Navbar />
				<Route exact path="/" component={Welcome} />
				<Route path="/contact" component={Contact} />
				<Route path="/people-ive-met" render={(props) => <Gallery categoryId={1} />} />
				<Route path="/the-world-around-me" render={(props) => <Gallery categoryId={2} />} />
				<Route path="/on-the-road" render={(props) => <Gallery categoryId={3} />} />
			</Router>
		);
	}
}

export default App;
