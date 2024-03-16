import React from 'react';
import logo from '../images/nnpia_logo.png';

function NavBar() {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo Společnosti" className="logo"/>
            <div className="navbar-title">
                <span className="text-primary">Orim</span>
                <span className="text-secondary">Car Rental</span>
            </div>
            <div className="navbar-menu">
                <div className="menu-section">
                    <a href="/" className="menu-item">Úvod</a>
                    <a href="/nabidka-vozidel" className="menu-item">Nabídka vozidel</a>
                </div>
                <div className="login-section">
                    <button className="login-button">Přihlášení</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;