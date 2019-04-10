import React, { Component } from 'react';

class GalleryGrid extends Component{

    render(){

        const { data } = this.props;

        const gridImages = data.map( (data) => (
                <div className="gallery__item" key={data.photo_id}>
                    <article className="gallery-image flex flex--row flex--wrap">
                        <a href={data.photo_src}>
                            <img className="gallery-image__img lazy" src={data.photo_src} alt={data.photo_desc} />
                        </a>
                        <h2 className="gallery-image__title">{data.photo_title} - <span className="gallery-image__album">Some Stuff</span></h2>
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