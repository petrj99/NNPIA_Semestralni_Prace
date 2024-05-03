import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { toast } from 'react-toastify';
import "./AddNewCar.css";
import 'react-toastify/dist/ReactToastify.css';

function EditReservation() {
    const [reservation, setReservation] = useState({
        startTime: '',
        endTime: '',
    });
    const { reservationId } = useParams();
    const navigate = useNavigate();

    const formatDateTimeLocal = (input) => {
        if (!input) return '';
        const date = new Date(input);
        const ten = (i) => (i < 10 ? '0' : '') + i;
        const YYYY = date.getFullYear();
        const MM = ten(date.getMonth() + 1);
        const DD = ten(date.getDate());
        const HH = ten(date.getHours());
        const II = ten(date.getMinutes());
        return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
    }

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await fetch(`/reservations/${reservationId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reservation details');
                }
                const data = await response.json();
                setReservation({
                    startTime: formatDateTimeLocal(data.startTime),
                    endTime: formatDateTimeLocal(data.endTime),
                });
            } catch (error) {
                toast.error("Failed to load reservation details: " + error.message);
                console.error('Error:', error);
            }
        };

        fetchReservation();
    }, [reservationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/reservations/${reservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(reservation),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Update failed");
            }

            toast.success('Rezervace byla úspěšně aktualizována');
            navigate('/manage-reservations');
        } catch (error) {
            toast.error("Failed to update reservation: " + error.message);
            console.error('Error:', error);
        }
    };

    const handleBack = () => {
        navigate('/sprava/seznam-rezervaci');
    };

    return (
        <div className="edit-reservation-page">
            <NavBar />
            <div className="content-container">
                <form className="car-form" onSubmit={handleSubmit}>
                    <h2>Úprava rezervace</h2>
                    <div>
                        <label htmlFor="startTime">Začátek rezervace:</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            className="datetime-input"
                            value={reservation.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endTime">Konec rezervace:</label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            className="datetime-input"
                            value={reservation.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Uložit změny</button>
                    <button type="button" onClick={handleBack} className="submit-button">Zpět</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default EditReservation;