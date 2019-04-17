import React, { Component } from 'react';

class AlertBanner extends Component{

    render(){

        const { alertType, alertMessage } = this.props; 

        let alertClass = 'banner banner--dismissible ';

        switch (alertType){
            case 'success':
                alertClass += 'banner--success';
                break;
            case 'error':
                alertClass += 'banner--error';
                break;
        }

        return(
            <div className={alertClass}> 
                { alertMessage }
                <button type="button" className="banner__close" data-dismiss="banner" aria-label="Close">
                    <span>&times;</span>
                </button>
            </div>
        )
    }
}

export default AlertBanner;