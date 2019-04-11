import React, { Component } from 'react';
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

    selectSpecificSubCategory(selectedSubCategory){
        this.setState({ selectedSubCategory });
    }

    render(){

        const { subCategoryList, data } = this.state;
        const { categoryName } = this.props;

        return(
            <div>
                <main className="main">
                    <section className="albums">
                        <h1 className="albums__title">{ categoryName }</h1>
                        <SubCategories subCategoryList={subCategoryList} selectSpecificSubCategory={this.selectSpecificSubCategory} />
                        <GalleryGrid data={data} />
                    </section>
                </main>
                <Footer />
            </div>
        )
    }
}

export default Gallery;