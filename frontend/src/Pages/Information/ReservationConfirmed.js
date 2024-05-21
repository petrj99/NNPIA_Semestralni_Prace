import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';

function ReservationConfirmed() {
    const navigate = useNavigate();

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="p-5 rounded-lg text-center" style={{
                    backgroundColor: 'rgba(108, 117, 125, 0.8)',
                    borderRadius: '15px',
                    color: 'white',
                    width: '40%',
                    maxWidth: '600px',
                    margin: '40px auto 60px',
                    padding: '20px',
                    boxSizing: 'border-box',
                }}>
                    <h2>Děkujeme, Vaše rezervace je potvrzena.</h2>
                    <button
                        onClick={() => navigate('/nabidka-vozidel')}
                        className="btn btn-primary m-2"
                        style={{ borderRadius: '10px' }}>
                        Zpět na nabídku vozidel
                    </button>
                    <button
                        onClick={() => navigate('/muj-profil')}
                        className="btn btn-primary m-2"
                        style={{ borderRadius: '10px' }}>
                        Zpět na můj profil
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ReservationConfirmed;