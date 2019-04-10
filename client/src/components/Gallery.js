import React, { Component } from 'react';

class Gallery extends Component{

    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){

        const { categoryId } = this.props;

        return(
            <main className="main">
                <section className="albums">
                    <h1 className="albums__title">Albums</h1>
                    <ul className="albums__list flex flex--row">
                        <li className="albums__item">
                            <a href="/albums/" className="albums__link">
                                All
                                <span className="albums__slider"></span>
                            </a>
                        </li>
                        <li className="albums__item">
                            <a href="/albums/" className="albums__link">
                                { categoryId }
                                <span className="albums__slider"></span>
                            </a>
                        </li>
                    </ul>

                    <div className="albums__select">
                        <div className="form__group">
                            <select name="" id="" className="form__control">
                                <option value="0">All</option>
                                <option value="1">Something</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="gallery grid grid--gallery grid--gap-1">
                    <div className="gallery__item">
                        <article className="gallery-image flex flex--row flex--wrap">
                            <a href="/gallery/image/">
                                <img className="gallery-image__img lazy" src="/img/blurred_image.jpg" data-src="Test" alt="Test" />
                            </a>
                            <h2 className="gallery-image__title">Hello - <span className="gallery-image__album">Some Stuff</span></h2>
                        </article>
                    </div>
                </section>
            </main>
        )
    }
}

export default Gallery;