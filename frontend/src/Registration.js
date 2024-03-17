import React from 'react';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import './Registration.css';

function Registration() {
    return (
        <div className="registration-page">
            <NavBar />
            <div className="registration-form-container">
                <form className="registration-form">
                    <h2>Registrace</h2>
                    <div className="form-group">
                        <label htmlFor="firstName">Křestní jméno:</label>
                        <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Příjmení:</label>
                        <input type="text" id="lastName" name="lastName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Datum narození:</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="registration-button">Registrovat</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Registration;