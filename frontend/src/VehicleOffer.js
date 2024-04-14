import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";


function VehicleOffer() {
    return (
        <div className="vehicle-offer-page">
            <NavBar />
            <div className="container mt-4">
                {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="mb-4">
                        <Card.Header as="h5">{vehicle.make} {vehicle.model}</Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-4">
                                    <Card.Img variant="top" src={vehicle.imageUrl} />
                                </div>
                                <div className="col-md-8">
                                    <Card.Title>{vehicle.model}</Card.Title>
                                    <Card.Text>
                                        Rok výroby: {vehicle.year}
                                        <br />
                                        Najeto kilometrů: {vehicle.mileage}
                                        <br />
                                        Cena: {vehicle.price}
                                    </Card.Text>
                                    <Button variant="primary" href={`/vehicles/${vehicle.id}`}>Zobrazit detail</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default VehicleOffer;