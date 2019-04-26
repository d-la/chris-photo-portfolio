import React, { Component } from 'react';
import Modal from './Modal';

class ModalContainer extends Component{

    closeModal = (e) => {
        const { toggleModal } = this.props;
        if ((e.target.className === 'modal-container') || (e.target.className === 'modal__close')){
            toggleModal();
        }
    }

    render(){

        const { isModalOpen, galleryImageSrc, selectedGalleryImageIndex, galleryImageAlt, dataLength, setNewModalData } = this.props;

        if ( isModalOpen ) {
            return(
                <div className="modal-container" onClick={this.closeModal}>
                    <Modal galleryImageSrc={galleryImageSrc} galleryImageAlt={galleryImageAlt} selectedGalleryImageIndex={selectedGalleryImageIndex} dataLength={dataLength} setNewModalData={setNewModalData} closeModal={this.closeModal} />
                </div>
            )
        } else { 
            return ( null );
        }
    }
}

export default ModalContainer;