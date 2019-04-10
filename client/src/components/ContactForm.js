import React, { Component } from 'react';

class ContactForm extends Component{

    render(){
        return(
            <div className="contact__form">
                <h1>Contact Me</h1>
                <form className="form">
                    <div className="form__group">
                        <label htmlFor="firstName" className="form__label">First Name</label>
                        <input type="text" name="firstName" className="form__control" required="required" />
                    </div>
                    <div className="form__group">
                            <label htmlFor="lastName" className="form__label">Last Name</label>
                            <input type="text" name="lastName" className="form__control" required="required" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="email" className="form__label">Email</label>
                        <input type="email" name="email" className="form__control" required="required" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="phoneNumber" className="form__label">Phone Number</label>
                        <input type="phoneNumber" name="phoneNumber" placeholder="000-000-0000" className="form__control" required="required" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="message" className="form__label">Message</label>
                        <textarea name="message" className="form__control form__control--textarea" required="required"></textarea>
                    </div>
                    <div className="form__group">
                        <button className="button button--normal">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ContactForm;