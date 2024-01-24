import React, { useState, useEffect } from 'react';

const DatabaseEntryForm = ({ onSubmit, formData }) => {
  const [roadName, setRoadName] = useState('');
  const [roadType, setRoadType] = useState('');
  const [height, setHeight] = useState('');
  const [link, setLink] = useState('');
  const [bridgeCoordinates, setBridgeCoordinates] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageBox, setImageBox] = useState(null);
  const [heightImplied, setHeightImplied] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Confirmation dialog
    const userConfirmed = window.confirm('Are you sure you want to submit the form?');
  
    if (userConfirmed) {
      // Process the form data here if user confirmed
      const formData = { 
        roadName, 
        roadType, 
        height, 
        link, 
        bridgeCoordinates, 
        imageBox, 
        imageName, 
        heightImplied 
      };
      onSubmit(formData);
    }
    // If user didn't confirm, do nothing (form won't be submitted)
  };

  // Effect to update state when formData changes
  useEffect(() => {
    if (formData) {
      setRoadName(formData.roadName || '');
      setRoadType(formData.roadType || '');
      setHeight(formData.height || '');
      setLink(formData.link || '');
      setBridgeCoordinates(formData.bridgeCoordinates || '');
      setImageName(formData.imageName || '');
      setImageBox(formData.imageBox || null);
      setHeightImplied(formData.heightImplied || false);
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={roadName} onChange={(e) => setRoadName(e.target.value)} placeholder="Road Name" />
      <select value={roadType} onChange={(e) => setRoadType(e.target.value)}>
        <option value="">Select Road Type</option>
        <option value="Highway">Highway</option>
        <option value="Arterial Road">Arterial Road</option>
        <option value="Collector Road">Collector Road</option>
        <option value="Local Road">Local Road</option>
      </select>
      <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
      <label>
        Height Implied:
        <input type="checkbox" checked={heightImplied} onChange={(e) => setHeightImplied(e.target.checked)} />
      </label>
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <input type="text" value={bridgeCoordinates} onChange={(e) => setBridgeCoordinates(e.target.value)} placeholder="Bridge Coordinates" />
      <input type="text" value={imageBox} onChange={(e) => setImageBox(e.target.value)} placeholder="Image Box"/>
      <input type="text" value={imageName} onChange={(e) => setImageName(e.target.value)} placeholder="Image Name"/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DatabaseEntryForm;