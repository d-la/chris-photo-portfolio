import React, { Component } from 'react';

class Modal extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    /**
     * Method to determine what position of the data array in GalleryGrid needs to be retrieved to display the next
     * gallery image 
     */
    traverseModal = (e) => {
        const { selectedGalleryImageIndex, dataLength, setNewModalData } = this.props;

        let newGalleryImageIndex;

        if (e.target.className === 'fa fa-chevron-left'){

            // If we're at the first photo, the next photo should be the last photo in the array
            if ( selectedGalleryImageIndex === 0 ){
                newGalleryImageIndex = dataLength - 1;
            } else {
                newGalleryImageIndex = selectedGalleryImageIndex - 1;
            }

        } else if (e.target.className === 'fa fa-chevron-right'){
            
            // If we're at the last photo, the next photo should be the first photo in the array
            if ( selectedGalleryImageIndex === dataLength - 1 ){
                newGalleryImageIndex = 0;
            } else {
                newGalleryImageIndex = selectedGalleryImageIndex + 1;
            }
        }

        // Execute method passed down from GalleryGrid Component
        setNewModalData(newGalleryImageIndex);
    }

    render(){

        const { galleryImageSrc, galleryImageAlt, closeModal } = this.props;

        return(
            <div className="modal">
                <div className="modal__close" onClick={closeModal}>
                    &times;
                </div>

                <div className="modal__prev" onClick={this.traverseModal}>
                    <i className="fa fa-chevron-left"></i>
                </div>

                <img src={galleryImageSrc} alt={galleryImageAlt} className="modal__img" />

                <div className="modal__next" onClick={this.traverseModal}>
                    <i className="fa fa-chevron-right"></i>
                </div>
            </div>
        )
    }
}

export default Modal;