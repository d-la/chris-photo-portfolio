import React, { Component } from 'react';

class SubCategories extends Component{

    render(){

        const { subCategoryTitles } = this.props;

        let subCategoryHtml = subCategoryTitles.map( (subCategoryName, index) => (
            <li className="albums__item" key={index}>
                <a href="/albums/" className="albums__link">
                    {subCategoryName}
                    <span className="albums__slider"></span>
                </a>
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