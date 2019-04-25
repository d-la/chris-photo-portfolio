import React, { Component } from 'react';
import Modal from './Modal';

class ModalContainer extends Component{

    render(){
        return(
            <div className="modal-container">
                <Modal />
            </div>
        )
    }
}

export default ModalContainer;