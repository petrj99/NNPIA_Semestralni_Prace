import React from 'react';
import './Login.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

function Login() {
    return (

        <div className="login-page">
            <NavBar />
        <div className="login-form-container">
            <form className="login-form">
                <h2>Přihlášení</h2>
                <div className="form-group">
                    <label htmlFor="username">Uživatelské jméno:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Heslo:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit" className="login-button">Přihlásit se</button>
                <div className="registration-link">
                    Nemáte účet? <a href="/registrace">Zaregistrujte se</a>
                </div>
            </form>
        </div>
            <Footer/>
        </div>
    );
}

export default Login;