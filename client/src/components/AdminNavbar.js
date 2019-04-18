import React, { Component } from 'react';

class AdminNavbar extends Component{
    render(){
        return(
            <header>
                <nav class="navbar navbar-expand-lg">
                    <a href="/admin/dashboard" class="nav__logo flex">
                        <div class="nav__logo-name">
                            CD
                        </div>
                    </a>
                    <button class="navbar--toggler" data-click="toggle-sidebar">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <ul class="navbar-nav navbar--custom ml-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Daniel La
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Settings <i class="fa fa-cogs"></i> </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Log Out <i class="fa fa-sign-out"></i> </a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default AdminNavbar;