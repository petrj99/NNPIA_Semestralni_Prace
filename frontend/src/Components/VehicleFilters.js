import React from 'react';
import './Styles/VehicleFilters.css';

function VehicleFilters({ filters, onFilterChange, onResetFilters }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        onFilterChange(name, value);
    };

    return (
        <div className="filters-container">
            <div className="row">
                <div className="col-md-2 filter-input">
                    <label>Najeto kilometrů (min):</label>
                    <input type="number" name="minMileage" value={filters.minMileage} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-2 filter-input">
                    <label>Najeto kilometrů (max):</label>
                    <input type="number" name="maxMileage" value={filters.maxMileage} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-2 filter-input">
                    <label>Rok od:</label>
                    <input type="number" name="minYear" value={filters.minYear} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-2 filter-input">
                    <label>Rok do:</label>
                    <input type="number" name="maxYear" value={filters.maxYear} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-2 filter-input">
                    <label>Cena za den (min):</label>
                    <input type="number" name="minPrice" value={filters.minPrice} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-2 filter-input">
                    <label>Cena za den (max):</label>
                    <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} className="form-control" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-danger mt-3 w-50" onClick={onResetFilters}>Vymazat filtry</button>
                </div>
            </div>
        </div>
    );
}

export default VehicleFilters;