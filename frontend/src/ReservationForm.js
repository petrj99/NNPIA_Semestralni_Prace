import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

const ReservationForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { carId } = useParams();

    const onSubmit = async (data) => {
        const reservationData = {
            ...data,
            carId,
        };

        try {
            const response = await fetch('/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            toast.success('Rezervace byla úspěšně vytvořena.');
            reset();
            navigate('/potvrzeni-rezervace');
        } catch (error) {
            toast.error('Rezervaci se nepodařilo vytvořit.');
            console.error(error);
        }
    };

    return (
        <div className="reservation-page">
            <NavBar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card mb-5">
                            <h5 className="card-header">Rezervace vozidla</h5>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="startTime" className="form-label">Začátek rezervace:</label>
                                        <input
                                            className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                                            id="startTime"
                                            type="datetime-local"
                                            {...register("startTime", { required: "Začátek rezervace je povinný" })}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.startTime && errors.startTime.message}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="endTime" className="form-label">Konec rezervace:</label>
                                        <input
                                            className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                                            id="endTime"
                                            type="datetime-local"
                                            {...register("endTime", { required: "Konec rezervace je povinný" })}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.endTime && errors.endTime.message}
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Rezervovat</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReservationForm;