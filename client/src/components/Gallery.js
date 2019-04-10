import React, { Component } from 'react';
import SubCategories from './SubCategories';
import GalleryGrid from './GalleryGrid';


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

        const { categoryName, subCategoryList, data } = this.state;

        return(
            <main className="main">
                <section className="albums">
                    <h1 className="albums__title">{ categoryName }</h1>
                    <SubCategories subCategoryTitles={subCategoryList} />
                    <GalleryGrid data={data} />
                </section>
            </main>
        )
    }
}

export default Gallery;