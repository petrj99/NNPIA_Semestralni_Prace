import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import './Controls.css';

function Controls() {
    let navigate = useNavigate();
    const navigateToAddCarPage = () => {
        navigate('/sprava/pridani-vozu');
    };

    const navigateToListCarPage = () => {
        navigate('/sprava/seznam-vozu');
    };

    const navigateToReservationList = () => {
        navigate('/sprava/seznam-rezervaci');
    };

    return (
        <div className="controls-page">
            <NavBar />
            <div className="content-container">
                <div className="admin-panel">
                    <h2>Administrátorský panel</h2>
                    <button onClick={navigateToAddCarPage} className="add-car-button">Přidat nový vůz do nabídky
                    </button>
                    <button onClick={navigateToListCarPage} className="add-car-button">Zobrazit všechny vozy
                    </button>
                    <button onClick={navigateToReservationList} className="add-car-button">Zobrazit všechny rezervace
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Controls;