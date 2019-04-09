import React, { Component } from 'react';
import './css/styles.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

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
					<div className="welcome">
						<div className="welcome__message">
							<h1>Welcome to Christopher Dinh's Photography Portfolio</h1>
							<p>
								<a href="/gallery" className="button button--green">View Gallery</a>
							</p>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
