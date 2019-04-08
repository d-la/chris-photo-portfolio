import React, { Component } from 'react';
import './css/styles.min.css';
import Header from './components/header';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="welcome">
					<div className="welcome__message">
						<h1>Welcome to Christopher Dinh's Photography Portfolio</h1>
						<p>
							<a href="/gallery" className="button button--green">View Gallery</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
