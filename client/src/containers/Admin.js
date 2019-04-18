import React, { Component, Fragment } from 'react';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';


class Admin extends Component {

    render(){

        const { mainComponent } = this.props;

        return(
            <Fragment>
                <AdminNavbar />
                <Sidebar />
                <main className="admin">
                    <h1 className="page-title">Dashboard</h1>

                    { mainComponent }
                </main>
            </Fragment>
        )
    }
}

export default Admin;