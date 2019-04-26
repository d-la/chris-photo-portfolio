import React, { Component } from 'react';

class Modal extends Component{

    render(){

        const { galleryImageSrc, galleryImageAlt } = this.props;

        return(
            <div className="modal">
                <div className="modal__close">
                    &times;
                </div>

                <div className="modal__prev">
                    <i className="fa fa-chevron-left"></i>
                </div>

                <img src={galleryImageSrc} alt={galleryImageAlt} className="modal__img" />

                <div className="modal__next">
                    <i className="fa fa-chevron-right"></i>
                </div>
            </div>
        )
    }
}

export default Modal;