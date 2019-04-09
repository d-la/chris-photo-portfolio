import React, { Component } from 'react';

class Header extends Component{

    constructor(props){
        super(props);

    }

    render(){

        const { categories } = this.props;

        let categoryListItems = categories.map( category => (
            <li className="nav__item" key={category.category_id}>
                <a href="/contact" className="nav__links">
                    { category.category_title }
                </a>
            </li>
        ));

        return(
            <nav className="nav">
                <span className="nav__toggle">
                    &#9776;
                </span>
                <a href="/" className="nav__logo flex">
                    <span className="nav__logo-name">
                        CD
                    </span>
                </a>

                <ul className="nav__list">
                    { categoryListItems }
                    <li className="nav__item">
                        <a href="/contact" className="nav__links">Contact</a>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Header;