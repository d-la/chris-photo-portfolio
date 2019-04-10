import React, { Component } from 'react';

class GalleryGrid extends Component{

    constructor(props){
        super(props);

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

    render(){

        const { data } = this.props;

        const gridImages = data.map( (data) => (

                <div className="gallery__item" key={data.photo_id}>
                    <article className="gallery-image flex flex--row flex--wrap">
                        <a href={data.photo_src}>
                            <img className="gallery-image__img lazy" src={data.photo_src} alt={data.photo_desc} />
                        </a>
                        <h2 className="gallery-image__title">{data.photo_title} - <span className="gallery-image__album">{this.formatDate(data.photo_date_added)}</span></h2>
                    </article>
                </div>
        ));


        return(
            <section className="gallery grid grid--gallery grid--gap-1">
                { gridImages }
            </section>
        )
    }
}

export default GalleryGrid;