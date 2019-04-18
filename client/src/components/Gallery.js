import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import SubCategories from './SubCategories';
import GalleryGrid from './GalleryGrid';
import Footer from './Footer';

class Gallery extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: [],
            categoryName: '',
            subCategoryList: [],
            selectedSubCategory: -1
        };

        this.selectSpecificSubCategory = this.selectSpecificSubCategory.bind(this);
    }

    async componentDidMount(){
        // Fetch subcategories and all associated photos from the category id
        const { categoryId } = this.props;

        const allPhotosEndpoint = `http://localhost:3000/api/category/all/${categoryId}`;
        const allSubCategoriesEndpoint = `http://localhost:3000/api/subcategory/category/${categoryId}`;

        try {
            let [allPhotos, allSubcategories] = await Promise.all([
                fetch(allPhotosEndpoint).then( res => res.json()),
                fetch(allSubCategoriesEndpoint).then( res => res.json())
            ]);

            this.setState({
                data: allPhotos,
                subCategoryList: allSubcategories
            });
        } catch (error) {
            console.log(error);

            // TODO: error logic
        }

    }

    /**
     * When the user clicks on a subcategory, change the DOM to show only photos from that subcategory
     * 
     * @param {int} selectedSubCategory the id of the subcategory the user selected
     */
    selectSpecificSubCategory(selectedSubCategory){
        const { data } = this.state;

        let newPhotos = data.filter( data => parseInt(data.subcategory_id) === parseInt(selectedSubCategory) );
        
        this.setState({
            data: newPhotos,
            selectedSubCategory
        });


    }

    render(){

        const { subCategoryList, data } = this.state;
        const { categoryName } = this.props;

        return(
            <Fragment>
                <Navbar />
                <main className="main">
                    <section className="albums">
                        <h1 className="albums__title">{ categoryName }</h1>
                        <SubCategories subCategoryList={subCategoryList} selectSpecificSubCategory={this.selectSpecificSubCategory} />
                        <GalleryGrid data={data} />
                    </section>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default Gallery;