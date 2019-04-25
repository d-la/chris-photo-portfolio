import React, { Component } from 'react';

class Modal extends Component{

    render(){

        const { galleryImageSrc, galleryImageAlt } = this.props;

        return(
            <div className="modal">
                <img src={galleryImageSrc} alt={galleryImageAlt} height="100%" width="100%" />
            </div>
        )
    }
}

export default Modal;