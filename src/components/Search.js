import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [latitude, setLatitude] = useState(6.9271); // Default to Colombo's latitude
  const [longitude, setLongitude] = useState(79.8612); // Default to Colombo's longitude

  const handleSearch = () => {
    onSearch(latitude, longitude);
  };

  return (
    <div>
      <label>Latitude:</label>
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <label>Longitude:</label>
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
