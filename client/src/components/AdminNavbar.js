import React, { Component } from 'react';

class AdminNavbar extends Component{
    render(){
        return(
            
                <nav className="navbar navbar-expand-lg">
                    <a href="/admin/dashboard" className="nav__logo flex">
                        <div className="nav__logo-name">
                            CD
                        </div>
                    </a>
                    <button className="navbar--toggler" data-click="toggle-sidebar">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <ul className="navbar-nav navbar--custom ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Daniel La
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Settings <i className="fa fa-cogs"></i> </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Log Out <i className="fa fa-sign-out"></i> </a>
                            </div>
                        </li>
                    </ul>
                </nav>
        )
    }
}

export default AdminNavbar;