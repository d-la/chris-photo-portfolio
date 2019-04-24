import React, { Component } from 'react';

class AlertBanner extends Component{

    constructor(props){
        super(props);

        this.state = {
            showBanner: true
        };
    }

    closeBanner = (e) => {
        this.setState({showBanner: false});
    }

    render(){

        const { alertType, alertMessage } = this.props; 
        const { showBanner } = this.state;

        let alertClass = 'banner banner--dismissible ';

        switch (alertType){
            case 'success':
                alertClass += 'banner--success';
                break;
            case 'error':
                alertClass += 'banner--error';
                break;
            default:
                break;
        }


        if (showBanner){
            return(
                <div className={alertClass}> 
                    { alertMessage }
                    <button type="button" className="banner__close" data-dismiss="banner" aria-label="Close" onClick={this.closeBanner}>
                        <span>&times;</span>
                    </button>
                </div>
            )
        } else {
            return ( null );
        }
    }
}

export default AlertBanner;