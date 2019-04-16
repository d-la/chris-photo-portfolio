import React, { Component, Fragment } from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import Footer from './Footer';

class Contact extends Component{

    render(){
        return(
            <Fragment>
                <main className="main">
                    <section className="contact">
                        <div className="flex flex--row">
                            <ContactInfo />
                            <ContactForm />
                        </div>
                    </section>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default Contact;