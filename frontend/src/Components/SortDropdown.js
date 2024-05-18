import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SortDropdown = ({ onSortChange }) => {
    const [sortAttribute, setSortAttribute] = useState('mileage');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortAttributeChange = (e) => {
        setSortAttribute(e.target.value);
        onSortChange(e.target.value, sortOrder);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
        onSortChange(sortAttribute, e.target.value);
    };

    return (
        <Form className="sort-dropdown d-flex align-items-center mb-4">
            <Form.Group controlId="sortAttribute" className="me-2">
                <Form.Label className="me-2">Řadit podle</Form.Label>
                <Form.Select value={sortAttribute} onChange={handleSortAttributeChange}>
                    <option value="mileage">Najeto kilometrů</option>
                    <option value="year">Rok výroby</option>
                    <option value="price">Cena</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="sortOrder">
                <Form.Label className="me-2">Řadit</Form.Label>
                <Form.Select value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">Vzestupně</option>
                    <option value="desc">Sestupně</option>
                </Form.Select>
            </Form.Group>
        </Form>
    );
};

export default SortDropdown;