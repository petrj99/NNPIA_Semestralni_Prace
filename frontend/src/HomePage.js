import React from 'react';
import './HomePage.css';
import logo from './images/nnpia_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function HomePage() {
    return (
        <div className="homepage">
            <nav className="navbar">
                <img src={logo} alt="Logo Společnosti" className="logo"/>
                <div className="navbar-title">
                    <span className="text-primary">Orim</span>
                    <span className="text-secondary">Car Rental</span>
                </div>
                <div className="navbar-menu">
                    <div className="menu-section">
                        <a href="/uvod" className="menu-item">Úvod</a>
                        <a href="/nabidka-vozidel" className="menu-item">Nabídka vozidel</a>
                    </div>
                    <div className="login-section">
                        <button className="login-button">Přihlášení</button>
                    </div>
                </div>
            </nav>

            <div className="middle-content">
                <header className="header">
                    <h1>Půjčte si vůz vašich snů</h1>
                </header>

                <section className="about-us">
                    <h2>O nás</h2>
                    <p>Vítejte v naší autopůjčovně, kde si klademe za cíl poskytovat prvotřídní služby a nezapomenutelné
                        zážitky na každé cestě. Založena s vášní pro automobily a dobrodružství, naše společnost nabízí
                        širokou paletu vozidel, od ekonomických modelů pro každodenní potřeby až po luxusní vozy pro ty
                        nejspeciálnější příležitosti. S více než desetiletými zkušenostmi na trhu, jsme se stali
                        důvěryhodným partnerem pro tisíce spokojených zákazníků, kteří hledají kvalitu, flexibilitu a
                        bezkonkurenční zákaznický servis.</p>

                    <p>Naším posláním je učinit pronájem auta snadným a příjemným zážitkem. Ať už plánujete dovolenou
                        snů, obchodní cestu nebo jen potřebujete dočasnou náhradu za vaše vozidlo, jsme zde, abychom vám
                        pomohli najít ideální auto pro vaše potřeby. Náš vozový park je pravidelně obnovován a udržován
                        v perfektním stavu, abychom zaručili vaši bezpečnost a pohodlí na cestách.</p>

                    <p>V naší autopůjčovně si zakládáme na osobním přístupu a flexibilitě. S námi můžete očekávat
                        transparentní cenovou politiku bez skrytých poplatků a přátelský tým profesionálů, který je vám
                        k dispozici 24/7.</p>

                    <p>Objednejte si váš vysněný vůz ještě dnes a proměňte vaše cestovní plány v nezapomenutelné
                        zážitky. Vaše spokojenost je naší nejvyšší prioritou a těšíme se na možnost stát se součástí
                        vašich budoucích dobrodružství.</p>
                </section>
            </div>

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
        </div>
    );
}

export default HomePage;