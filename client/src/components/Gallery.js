import React, { Component } from 'react';
import SubCategories from './SubCategories';


class Gallery extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: [],
            categoryName: '',
            subCategoryList: []
        };
    }

    componentDidMount(){
        // Fetch subcategories and all associated photos from the category id
        const { categoryId } = this.props;

        fetch(`http://localhost:3000/api/category/all/${categoryId}`)
            .then( data => data.json())
            .then( data => {

                let categoryName = (data[0].category_title) ? data[0].category_title : 'Loading...';

                let subCategoryList = [];

                // Loop through the returned data and extract only subcategory titles that are not already in the array
                data.forEach( data => {
                    if (subCategoryList.indexOf(data.subcategory_title) === -1){
                        subCategoryList.push(data.subcategory_title);
                    }
                });

                this.setState({ 
                    data,
                    categoryName,
                    subCategoryList
                })
                console.log(this.state.data);
            })
            .catch( error => console.log(error) );
    }

    render(){

        const { categoryName, subCategoryList } = this.state;

        return(
            <main className="main">
                <section className="albums">
                    <h1 className="albums__title">{ categoryName }</h1>
                    <SubCategories subCategoryTitles={subCategoryList} />
                    
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