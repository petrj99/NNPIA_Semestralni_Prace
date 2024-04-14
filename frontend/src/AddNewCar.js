import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./AddNewCar.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewCar() {
    const [car, setCar] = useState({
        manufacturer: '',
        model: '',
        year: '',
        mileage: '',
        price: '',
        registration: ''
    });
    const [file, setFile] = useState(null);
    const [formKey, setFormKey] = useState(Date.now());
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const navigate = useNavigate();

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

        for (const key in car) {
            formData.append(key, car[key]);
        }

        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await fetch('/controls/caradd', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Car added:', data);
                setFormKey(Date.now());
                toast.success('Vůz byl úspěšně přidán!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                throw new Error('Failed to add car.');
            }
        } catch (error) {
            toast.error('Chyba při přidávání vozu.');
            console.error('Error:', error);
        }
    };

    const handleBack = () => {
        navigate('/sprava');
    };

    return (
        <div className="add-car-page">
            <NavBar />
            <div className="content-container">
                <form key={formKey} className="car-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2>Přidání nového vozu</h2>
                    <input type="text" name="manufacturer" placeholder="Výrobce" onChange={handleChange} required/>
                    <input type="text" name="model" placeholder="Model" onChange={handleChange} required/>
                    <input type="number" name="year" placeholder="Rok" onChange={handleChange} required/>
                    <input type="number" name="mileage" placeholder="Najeto kilometrů" onChange={handleChange}
                           required/>
                    <input type="number" name="price" placeholder="Cena" onChange={handleChange} required/>
                    <input type="text" name="registration" placeholder="Registrační značka" onChange={handleChange}
                           required/>
                    <input type="file" name="image" onChange={handleFileChange} accept="image/*"/>
                    <button type="submit" className="submit-button">Přidat vůz</button>
                    <button type="button" onClick={handleBack} className="submit-button">Zpět</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default AddNewCar;