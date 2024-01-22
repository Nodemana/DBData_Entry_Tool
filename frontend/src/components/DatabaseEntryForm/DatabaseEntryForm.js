import React, { useState } from 'react';

const DatabaseEntryForm = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [roadName, setRoadName] = useState('');
  const [roadType, setRoadType] = useState('');
  const [height, setHeight] = useState('');
  const [link, setLink] = useState('');
  const [bridgeCoordinates, setBridgeCoordinates] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here
    const formData = { id, roadName, roadType, height, link, bridgeCoordinates, imageName, imageFile };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
      <input type="text" value={roadName} onChange={(e) => setRoadName(e.target.value)} placeholder="Road Name" />
      <input type="text" value={roadType} onChange={(e) => setRoadType(e.target.value)} placeholder="Road Type" />
      <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <input type="text" value={bridgeCoordinates} onChange={(e) => setBridgeCoordinates(e.target.value)} placeholder="Bridge Coordinates" />
      <input type="text" value={imageName} placeholder="Image Name" disabled />
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DatabaseEntryForm;