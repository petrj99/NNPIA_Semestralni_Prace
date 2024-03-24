import React, { useState } from 'react';
import './Login.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Zabránit defaultnímu odeslání formuláře

        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Zde použijte email namísto username
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Uložení JWT tokenu, přesměrování, atd.
                sessionStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                throw new Error('Přihlášení selhalo');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <NavBar />
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Přihlášení</h2>
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo:</label>
                        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
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