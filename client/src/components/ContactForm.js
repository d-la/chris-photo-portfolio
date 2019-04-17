import React, { Component } from 'react';

class ContactForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let data = this.state;

        fetch('http://localhost:3000/api/contact', {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( data => data.json())
        .then( data => console.log(data))
        .catch( error => console.log(error));
        
    }

    render(){

        const { firstName, lastName, email, phoneNumber, message } = this.state;

        return(
            <div className="contact__form">
                <h1>Contact Me</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form__group">
                        <label htmlFor="firstName" className="form__label">First Name</label>
                        <input type="text" name="firstName" id="firstName" className="form__control" required="required" onChange={this.handleChange} value={firstName} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="lastName" className="form__label">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="form__control" required="required" onChange={this.handleChange} value={lastName} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="email" className="form__label">Email</label>
                        <input type="email" name="email" id="email" className="form__control" required="required" onChange={this.handleChange} value={email} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="phoneNumber" className="form__label">Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" placeholder="000-000-0000" className="form__control" required="required" onChange={this.handleChange} value={phoneNumber} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="message" className="form__label">Message</label>
                        <textarea name="message" id="message" className="form__control form__control--textarea" required="required" onChange={this.handleChange} value={message}></textarea>
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