import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import "./Profile.css"
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

function Profile() {
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: ''
    });

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    useEffect(() => {
        fetch('api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => setUserProfile(data))
            .catch(error => console.error('Nastala chyba při načítání profilu uživatele:', error));
    }, []);

    return (
        <div className="profile-page">
            <NavBar />
            <div className="user-container">
            {userProfile ? (
                <div className="user-profile">
                    <h2>Moje osobní informace</h2>
                    <div><FontAwesomeIcon icon={faUser} className="fa-icon" /> <strong>Jméno:</strong> {userProfile.firstName}</div>
                    <div><FontAwesomeIcon icon={faUser} className="fa-icon" /> <strong>Příjmení:</strong> {userProfile.lastName}</div>
                    <div><FontAwesomeIcon icon={faEnvelope} className="fa-icon" /> <strong>Email:</strong> {userProfile.email}</div>
                    <div><FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" /> <strong>Datum narození:</strong> {formatDate(userProfile.dateOfBirth)}</div>
                </div>
            ) : (
                <p>Načítání profilu uživatele...</p>
            )}
            </div>
            <Footer />
        </div>
    );
}

export default Profile;