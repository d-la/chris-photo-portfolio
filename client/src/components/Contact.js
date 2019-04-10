import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

class Contact extends Component{

    render(){
        return(
            <main className="main">
                <section className="contact">
                    <div className="flex flex--row">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </section>
            </main>
        )
    }
}

export default Contact;