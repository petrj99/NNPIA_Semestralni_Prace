import React, {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import './AdminVehicleList.css';
import {useNavigate} from "react-router-dom";

const AdminVehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch vehicles from the API
        const fetchVehicles = async () => {
            try {
                const response = await fetch('/load/vehicles');
                if (!response.ok) {
                    throw new Error('Server error: ' + response.status);
                }
                const data = await response.json();
                setVehicles(data);
            } catch (error) {
                console.error('Fetching vehicles failed:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleEditClick = (carId) => {
        navigate(`edit/${carId}`);
    };

    const handleRemoveClick = async (carId) => {
        if(window.confirm("Opravdu chcete odstranit toto vozidlo?")) {
            try {
                const response = await fetch(`/controls/cars/${carId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    setVehicles(vehicles.filter((vehicle) => vehicle.id !== carId));
                    console.log('Vozidlo bylo odstraněno');
                } else {
                    console.error('Chyba při odstraňování vozidla');
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
                        <th>Výrobce</th>
                        <th>Model</th>
                        <th>Rok výroby</th>
                        <th>Najeto kilometrů</th>
                        <th>Cena</th>
                        <th>Registrační značka</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.make}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.year}</td>
                            <td>{vehicle.mileage} Km</td>
                            <td>{vehicle.price} Kč/den</td>
                            <td>{vehicle.licencePlate}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditClick(vehicle.id)}>
                                    Upravit
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={() => handleRemoveClick(vehicle.id)}>
                                    Odebrat
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
};

export default AdminVehicleList;