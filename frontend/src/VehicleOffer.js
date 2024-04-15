import React, { useState, useEffect } from 'react';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { Card, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';


function VehicleOffer() {
    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [vehiclesPerPage] = useState(20);
    const isAuthenticated = !!sessionStorage.getItem('token');

    const handleReserve = (carId) => {
        if (isAuthenticated) {
            // Todo pridat predani ID do formulare
            window.location.href = `/rezervace/${carId}`;
        } else {
            window.location.href = '/prihlaseni';
        }
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('/load/vehicles');
                if (!response.ok) {
                    throw new Error('Server error: ' + response.status);
                }
                const data = await response.json();
                console.log(data);
                setVehicles(data);
            } catch (error) {
                console.error('Fetching vehicles failed:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handlePageClick = (data) => {
        let selected = data.selected;
        setCurrentPage(selected);
    };

    const offset = currentPage * vehiclesPerPage;
    const currentPageData = vehicles.slice(offset, offset + vehiclesPerPage);

    const pageCount = Math.ceil(vehicles.length / vehiclesPerPage);

    return (
        <div className="vehicle-offer-page">
            <NavBar />
            <div className="container mt-4">
                <div className="row">
                    {currentPageData.map((vehicle, index) => (
                        <div className="col-md-6" key={vehicle.id}>
                            <Card key={vehicle.id} className="mb-4 h-50 custom-card">
                                <Card.Header as="h5" className="custom-card-header">{vehicle.make} {vehicle.model}</Card.Header>
                                <Card.Body className="custom-card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Card.Img variant="top" src={`data:image/jpeg;base64,${vehicle.image}`} />
                                        </div>
                                        <div className="col-md-6">
                                            <Card.Title className="custom-card-title">{vehicle.model}</Card.Title>
                                            <Card.Text className="custom-card-text">
                                                Rok výroby: {vehicle.year}
                                                <br />
                                                Najeto kilometrů: {vehicle.mileage}
                                                <br />
                                                Cena: {vehicle.price} Kč/den včetně DPH
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleReserve(vehicle.id)}>
                                                Rezervovat
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <ReactPaginate
                    previousLabel={'Předchozí'}
                    nextLabel={'Další'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    forcePage={currentPage}
                />
            </div>
            <Footer />
        </div>
    );
}

export default VehicleOffer;