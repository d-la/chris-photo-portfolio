import React, { Component } from 'react';
import Modal from './Modal';

class ModalContainer extends Component{

    closeModal = (e) => {
        const { toggleModal } = this.props;
        if (e.target.className === 'modal-container'){
            toggleModal();
        }
    }

    render(){

        const { isModalOpen } = this.props;

        if ( isModalOpen ) {
            return(
                <div className="modal-container" onClick={this.closeModal}>
                    <Modal />
                </div>
            )
        } else { 
            return ( null );
        }
    }
}

export default ModalContainer;