import React, { Component } from 'react';

class SubCategories extends Component{

    constructor(props){
        super(props);

        this.selectSubCategory = this.selectSubCategory.bind(this);
    }

    selectSubCategory(e){

        const { selectSpecificSubCategory } = this.props;

        let subCategoryId = e.currentTarget.dataset.subcategory;

        selectSpecificSubCategory(subCategoryId);
    }

    render(){

        const { subCategoryList } = this.props;

        let subCategoryHtml = subCategoryList.map( (data) => (
            <li className="albums__item" key={data.subcategory_id} data-subcategory={data.subcategory_id} onClick={this.selectSubCategory}>
                {data.subcategory_title}
                <span className="albums__slider"></span>
            </li>
        ));

        return(
            <ul className="albums__list flex flex--row">
                {subCategoryHtml}
            </ul>
        )
    }
}

export default SubCategories;