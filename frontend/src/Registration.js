import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import './Registration.css';

function Registration() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        fetch('/registrace', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Něco se pokazilo při registraci.');
            })
            .then(data => console.log('Registrace úspěšná:', data))
            .catch(error => console.error('Chyba:', error));
    };

    return (
        <div className="registration-page">
            <NavBar />
            <div className="registration-form-container">
                <form className="registration-form" onSubmit={handleSubmit}>
                    <h2>Registrace</h2>
                    <div className="form-group">
                        <label htmlFor="firstName">Křestní jméno:</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Příjmení:</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Datum narození:</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="registration-button">Registrovat</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Registration;