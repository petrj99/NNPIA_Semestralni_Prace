import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faLinkedinIn, faTwitter} from "@fortawesome/free-brands-svg-icons";
import React from "react";


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    <h3>Kontaktní Údaje</h3>
                    <p>Orim Car Rental, s.r.o.</p>
                    <p>Vozová 1234/56, 110 00 Praha 1</p>
                    <p>Email: kontakt@orimrental.cz</p>
                    <p>Telefon: +420 123 456 789</p>
                </div>
                <div className="social-media">
                    <h3>Sledujte Nás</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" className="social-icon">
                            <FontAwesomeIcon icon={faFacebookF}/>
                        </a>
                        <a href="https://instagram.com" className="social-icon">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                        <a href="https://twitter.com" className="social-icon">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                        <a href="https://linkedin.com" className="social-icon">
                            <FontAwesomeIcon icon={faLinkedinIn}/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;