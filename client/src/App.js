import React, { Component } from 'react';
import './css/styles.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Contact from './components/Contact';

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			categories: []
		}
	}

	componentWillMount(){
		fetch('http://localhost:3000/api/category')
			.then( data => data.json() )
			.then( data => this.setState({categories: data}) )
			.catch( error => console.log(error) );
	}

	render() {

		const { categories } = this.state;

		return (
			<Router>
				<div>
					<Navbar categories={categories} />
					<Route exact path="/" component={Welcome} />
					<Route path="/contact" component={Contact} />
				</div>
			</Router>
		);
	}
}

export default App;
