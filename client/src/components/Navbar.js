import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{

    constructor(props){
        super(props);

        this.state = {
            navbarClass: 'nav__list'
        }

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
    }

    handleNavbarToggle(){
        if (this.state.navbarClass === 'nav__list'){
            this.setState({ navbarClass: 'nav__list nav__list--active' });
        } else {
            this.setState({ navbarClass: 'nav__list' });
        }
    }

    render(){

        const { categories } = this.props;
        const { navbarClass } = this.state;

        let categoryListItems = categories.map( category => (
            <li className="nav__item" key={category.category_id}>
                <Link to={category.category_route} className="nav__links">
                    { category.category_title }
                </Link>
            </li>
        ));

        return(
            <nav className="nav">
                <span className="nav__toggle " onClick={this.handleNavbarToggle}>
                    &#9776;
                </span>
                <Link to="/" className="nav__logo flex">
                    <span className="nav__logo-name">
                        CD
                    </span>
                </Link>

                <ul className={navbarClass}>
                    { categoryListItems }
                    <li className="nav__item">
                        <Link to="/contact" className="nav__links">Contact</Link>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Navbar;