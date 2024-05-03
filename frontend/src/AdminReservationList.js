import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { Table, Button } from 'react-bootstrap';

function AdminReservationList() {
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch reservations from the API
        const fetchReservations = async () => {
            try {
                const response = await fetch('/reservations/all-reservations');
                if (!response.ok) {
                    throw new Error('Server error: ' + response.status);
                }
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error('Fetching reservations failed:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleEditClick = (reservationId) => {
        navigate(`edit/${reservationId}`);
    };

    const handleCancelClick = async (reservationId) => {
        if(window.confirm("Opravdu chcete zrušit tuto rezervaci?")) {
            try {
                const response = await fetch(`/controls/reservations/${reservationId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    setReservations(reservations.filter((reservation) => reservation.id !== reservationId));
                    console.log('Rezervace byla zrušena');
                } else {
                    console.error('Chyba při rušení rezervace');
                }
            } catch (error) {
                console.error('Nastala chyba:', error);
            }
        }
    };

    return (
        <div>
            <NavBar/>
            <div className="container mt-4">
                <Table striped bordered hover responsive className="custom-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Uživatel</th>
                        <th>Vozidlo</th>
                        <th>Začátek rezervace</th>
                        <th>Konec rezervace</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.userEmail}</td>
                            <td>{reservation.carModel}</td>
                            <td>{new Date(reservation.startTime).toLocaleString()}</td>
                            <td>{new Date(reservation.endTime).toLocaleString()}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditClick(reservation.id)}>
                                    Upravit
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={() => handleCancelClick(reservation.id)}>
                                    Zrušit
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <Footer/>
        </div>
    );
}

export default AdminReservationList;