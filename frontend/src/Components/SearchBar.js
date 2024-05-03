import React from 'react';

function SearchBar({ onSearch }) {
    const handleSearch = (event) => {
        onSearch(event.target.value);
    };

    return (
        <input
            type="text"
            className="form-control mb-3"
            placeholder="Vyhledat vozidlo..."
            onChange={handleSearch}
        />
    );
}

export default SearchBar;