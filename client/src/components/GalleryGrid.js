import React, { Component, Fragment } from 'react';
import ModalContainer from './ModalContainer';

class GalleryGrid extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false,
            galleryImageSrc: '',
            galleryImageAlt: '',
            selectedGalleryImageIndex: -1
        };

        this.formatDate = this.formatDate.bind(this);
    }

    /**
     * Convert a MySQL formatted date into YYYY-MM-DD
     * 
     * @param {date} date date to be converted
     * 
     * @return {string}
     */
    formatDate(date){
        let newDate = new Date(date),
        month = '' + (newDate.getMonth() + 1),
        day = '' + newDate.getDate(),
        year = newDate.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    /**
     * General method to toggle the visibility state of the modal
     */
    toggleModal = () => {
        const { isModalOpen } = this.state;

        if (isModalOpen){
            this.setState({isModalOpen: false});
        } else {
            this.setState({isModalOpen: true});
        }

    }

    /**
     * Method for gallery grid images. Will find necessary data and set state to allow for viewing images on the modal and traversing
     */
    toggleModalAndSetModalData = (e) => {

        const galleryImageId = e.target.dataset.photoId;

        const { data } = this.props;

        const selectedGalleryImageIndex = data.findIndex( galleryImage => parseInt(galleryImage.photo_id) === parseInt(galleryImageId));

        let galleryImageData = {
            src: e.target.getAttribute('src'),
            alt: e.target.getAttribute('alt')
        };
        
        const { isModalOpen } = this.state;

        if (isModalOpen){
            this.setState({isModalOpen: false});
        } else {
            this.setState({
                isModalOpen: true,
                selectedGalleryImageIndex,
                galleryImageSrc: galleryImageData.src,
                galleryImageAlt: galleryImageData.alt
            });
        }
    }

    /**
     * A method that will find the data for the prev/next gallery image when a modal traversing button is clicked and setState
     * to allow the new image to show on the modal
     * 
     * @param {int} newGalleryImageIndex the new index of the next gallery image to show. This is determined in the Modal component
     */
    setNewModalData = (newGalleryImageIndex) => {
        const { data } = this.props;

        const wantedPhoto = data.filter( (photo, index) => parseInt(index) === parseInt(newGalleryImageIndex));

        this.setState({  
            isModalOpen: true,
            selectedGalleryImageIndex: newGalleryImageIndex,
            galleryImageSrc: wantedPhoto[0].photo_src,
            galleryImageAlt: wantedPhoto[0].photo_desc
        });
    }

    render(){

        const { data } = this.props;
        const { isModalOpen, galleryImageSrc, galleryImageAlt, selectedGalleryImageIndex } = this.state;

        const gridImages = data.map( (data) => (

                <div className="gallery__item" key={data.photo_id}>
                    <article className="gallery-image flex flex--row flex--wrap">
                        <img className="gallery-image__img lazy" src={data.photo_src} alt={data.photo_desc} data-photo-id={data.photo_id} onClick={this.toggleModalAndSetModalData} />
                        <h2 className="gallery-image__title">{data.photo_title} - <span className="gallery-image__album">{this.formatDate(data.photo_date_added)}</span></h2>
                    </article>
                </div>
        ));


        return(

            <Fragment>
                <section className="gallery grid grid--gallery grid--gap-1">
                    { gridImages }
                </section>
                <ModalContainer isModalOpen={isModalOpen} galleryImageSrc={galleryImageSrc} galleryImageAlt={galleryImageAlt} selectedGalleryImageIndex={selectedGalleryImageIndex} dataLength={data.length} setNewModalData={this.setNewModalData} toggleModal={this.toggleModal} />
            </Fragment>
        )
    }
}

export default GalleryGrid;