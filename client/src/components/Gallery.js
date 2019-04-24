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
            dataToDisplay: [],
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
                dataToDisplay: allPhotos,
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

        let photosToDisplay = data.filter( data => parseInt(data.subcategory_id) === parseInt(selectedSubCategory) );
        
        this.setState({
            dataToDisplay: photosToDisplay,
            selectedSubCategory
        });


    }

    /**
     * When the user clicks the category, reset the photos to display all photos from the category
     */
    resetSubCategories = () => {

        const originalData = this.state.data;

        this.setState({
            dataToDisplay: originalData,
            selectedSubCategory: -1
        });
    }

    render(){

        const { subCategoryList, dataToDisplay, selectedSubCategory } = this.state;
        const { categoryName } = this.props;

        return(
            <Fragment>
                <Navbar />
                <main className="main">
                    <section className="albums">
                        <h1 className="albums__title" onClick={this.resetSubCategories}>{ categoryName }</h1>
                        <SubCategories subCategoryList={subCategoryList} selectSpecificSubCategory={this.selectSpecificSubCategory} selectedSubCategory={selectedSubCategory} />
                        <GalleryGrid data={dataToDisplay} />
                    </section>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default Gallery;