import React, { Component } from 'react';

class Header extends Component{

    render(){
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
                    <li className="nav__item">
                        <a href="/contact" className="nav__links">Contact</a>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Header;