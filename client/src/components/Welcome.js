import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';

class Welcome extends Component{

    render(){
        return(
            <Fragment>
                <Navbar />
                <div className="welcome">
                    <div className="welcome__message">
                        <h1>Welcome to Christopher Dinh's Photography Portfolio</h1>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Welcome;