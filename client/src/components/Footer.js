import React from 'react';

const Footer = (props) => {
    return (
        <footer className="footer flex flex--row">
            <p className="footer__copy">
                &copy; Christopher Dinh 2019
            </p>
            <p className="footer__social">
                <a href="https://www.instagram.com/cd.nyc/" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <i className="fa fa-instagram"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCjlJ0X226cjB-HT4M7SAj1g" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <i className="fa fa-youtube-play"></i>
                </a>
            </p>
        </footer>
    )
}

export default Footer;