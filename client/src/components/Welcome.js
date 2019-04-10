import React, { Component } from 'react';

class Welcome extends Component{

    render(){
        return(
            <div className="welcome">
				<div className="welcome__message">
					<h1>Welcome to Christopher Dinh's Photography Portfolio</h1>
					<p>
						<a href="/gallery" className="button button--green">View Gallery</a>
					</p>
				</div>
			</div>
        )
    }
}

export default Welcome;