import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import "./Styles/AddNewCar.css"
import { toast } from 'react-toastify';

function EditCar() {
    const [car, setCar] = useState({
        make: '',
        model: '',
        year: '',
        mileage: '',
        price: '',
        licencePlate: ''
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const { carId } = useParams();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`/load/vehicles/${carId}`);
                const data = await response.json();
                setCar({
                    make: data.make,
                    model: data.model,
                    year: data.year,
                    mileage: data.mileage,
                    price: data.price,
                    licencePlate: data.licencePlate,
                    image: data.image
                });
            } catch (error) {
                console.error('Chyba při načítání údajů o vozidle:', error);
            }
        };

        if (carId) {
            fetchCar();
        }
    }, [carId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({...car, [name]: value});
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Soubor musí být typu obrázek.');
                setFile(null);
            } else if (file.size > MAX_FILE_SIZE) {
                alert('Soubor je moc velký, povolená velikost je max 5MB.');
                setFile(null);
            } else {
                setFile(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // for (const key in car) {
        //     formData.append(key, car[key]);
        // }

        formData.append('car', new Blob([JSON.stringify({
            make: car.make,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            price: car.price,
            licencePlate: car.licencePlate
        })], {
            type: 'application/json'
        }));

        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await fetch(`/controls/cars/${carId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                toast.success('Údaje vozu byly aktualizovány!', {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate('/sprava/seznam-vozu');
            } else {
                throw new Error('Aktualizace vozu selhala.');
            }
        } catch (error) {
            toast.error('Chyba při aktualizaci vozu.');
            console.error('Error:', error);
        }
    };

    const handleBack = () => {
        navigate('/sprava/seznam-vozu');
    };

    return (
        <div className="edit-car-page">
            <NavBar />
            <div className="content-container">
                <form className="car-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2>Úprava vozu</h2>
                    <input type="text" name="make" value={car.make} onChange={handleChange} required/>
                    <input type="text" name="model" value={car.model} onChange={handleChange} required/>
                    <input type="number" name="year" value={car.year} onChange={handleChange} required/>
                    <input type="number" name="mileage" value={car.mileage} onChange={handleChange} required/>
                    <input type="number" name="price" value={car.price} onChange={handleChange} required/>
                    <input type="text" name="licencePlate" value={car.licencePlate} onChange={handleChange} required/>
                    <input type="file" name="image" onChange={handleFileChange} accept="image/*"/>
                    {car.image && (
                        <img src={`data:image/jpeg;base64,${car.image}`} alt="Car"/>
                    )}
                    <button type="submit" className="submit-button">Uložit změny</button>
                    <button type="button" onClick={handleBack} className="submit-button">Zpět</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default EditCar;