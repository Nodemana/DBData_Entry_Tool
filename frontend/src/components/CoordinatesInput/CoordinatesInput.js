import React, { useState } from 'react';

const CoordinatesInput = ({ onPopulate }) => {
  const [coordinates, setCoordinates] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onPopulate(coordinates);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={coordinates}
        onChange={(e) => setCoordinates(e.target.value)}
        placeholder="Latitude, Longitude"
        style={{ width: '300px', textAlign: 'center' }}
      />
      <br />
      <button type="submit">Populate</button>
    </form>
  );
};

export default CoordinatesInput;
