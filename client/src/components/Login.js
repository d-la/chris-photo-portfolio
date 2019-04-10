import React, { Component } from 'react';

class Login extends Component{

    render(){
        return(
            <main className="login flex flex--row flex--no-wrap">
                <section className="login__left-half">

                </section>

                <section className="login__right-half">
                    <h1 className="login__title">
                        Christopher Dinh's Photography Portfolio Admin Portal
                    </h1>
                    <div className="login__form">
                        <form className="form">
                            <div className="form__group">
                                <label htmlFor="userEmail">Email address</label>
                                <input type="email" className="form__control" id="userEmail" aria-describedby="user" name="email" placeholder="Enter email" />
                            </div>
                            <div className="form__group">
                                <label htmlFor="userPassword">Password</label>
                                <input type="password" className="form__control" id="userPassword" name="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="button button--normal">Log In</button>
                        </form>
                    </div>
                    <p className="login__copyright">
                        Christopher Dinh &copy; 2019
                    </p>
                </section>
            </main>
        )
    }
}

export default Login;