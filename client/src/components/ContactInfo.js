import React, { Component } from 'react';


class ContactInfo extends Component{

    render(){
        return(
            <div className="contact__information">
                <div className="bio">
                    <h1 className="bio__title">24 Year Old photographer based out of New York City</h1>
                    <div className="bio__image-container">
                        <img src="/img/chris_dinh.jpg" alt="Christopher Dinh the photographer" className="bio__img" />
                    </div>
                    <p className="bio__desc">
                        With a passion for sharing and exploring, each picture allows me to share a piece of my life with the world.
                    </p>
                    <p className="bio__desc">
                        Whether it be the furthest beaches of Iceland, the tallest mountains of New Hampshire, or the grandest buildings in New York City, each location brings something new to experience.
                    </p>
                </div>
            </div>
        )
    }
}

export default ContactInfo;