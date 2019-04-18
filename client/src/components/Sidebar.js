import React, { Component, Fragment } from 'react';

class Sidebar extends Component{

    render(){
        return(
            <Fragment>
                <aside className="sidebar">
                    <ul className="sidebar__list">
                        <li className="sidebar__user-info">
                            <div className="user">
                                <span className="user__name">
                                    Daniel La
                                </span>
                                <span className="user__type">
                                    Admin
                                </span>
                            </div>
                        </li>
                        <a href="/admin/dashboard" className="sidebar__link sidebar__link--round-borders">
                            <li className="sidebar__list-item">
                                <i className="fa fa-line-chart"></i>
                                Dashboard
                            </li>
                        </a>
                        <a href="/admin/albums" className="sidebar__link sidebar__link--round-borders">
                            <li className="sidebar__list-item">
                                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                Albums
                            </li>
                        </a>
                        <a href="/admin/images" className="sidebar__link sidebar__link--round-borders">
                            <li className="sidebar__list-item">
                                <i className="fa fa-picture-o"></i>
                                Images
                            </li>
                        </a>
                    </ul>
                </aside>
                <div className="sidebar-end">
                </div>
            </Fragment>
        )
    }
}

export default Sidebar;