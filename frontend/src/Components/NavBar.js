import React from 'react';
import logo from '../images/nnpia_logo.png';
import { useNavigate } from "react-router-dom";

function NavBar() {
    let navigate = useNavigate();
    const isAuthenticated = !!sessionStorage.getItem('token');

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    };

    function handleLoginClick() {
        navigate('/prihlaseni');
    }

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
                    {isAuthenticated && <a href="/muj-profil" className="menu-item">Můj profil</a>}
                </div>
                <div className="login-section">
                    {isAuthenticated ? (
                        <button className="login-button" onClick={handleLogout}>Odhlásit</button>
                    ) : (
                        <button className="login-button" onClick={handleLoginClick}>Přihlášení</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;