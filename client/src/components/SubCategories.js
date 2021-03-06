import React, { Component, Fragment } from 'react';

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

    selectSubCategoryFromOption = (e) => {
        const { selectSpecificSubCategory } = this.props;

        let subCategoryId = e.target.value;

        selectSpecificSubCategory(subCategoryId);
    }

    render(){

        const { subCategoryList, selectedSubCategory } = this.props;

        let subCategoryHtml = subCategoryList.map( (data) => {

            let className = '';

            if (parseInt(selectedSubCategory) === parseInt(data.subcategory_id)){
                className = ' albums__item--active';
            }

            return (
                <li className={`albums__item ${className}`} key={data.subcategory_id} data-subcategory={data.subcategory_id} onClick={this.selectSubCategory}>
                    {data.subcategory_title}
                </li>
            )
        });

        let subCategoryOptions = subCategoryList.map( (data) => (
            <option value={data.subcategory_id} key={data.subcategory_id}>{ data.subcategory_title }</option>
        ));

        return(
            <Fragment>
                <ul className="albums__list flex flex--row">
                    {subCategoryHtml}
                </ul>

                <div className="albums__select">
                    <div className="form__group">
                        <select className="form__control" onChange={this.selectSubCategoryFromOption}>
                            <option>Select Subcategory</option>
                            { subCategoryOptions }
                        </select>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SubCategories;