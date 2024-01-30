import React, { useState } from 'react';
import ConnectionBox from './components/ConnectionBox/ConnectionBox';
import Modal from './components/Modal/Modal';
import CoordinatesInput from './components/CoordinatesInput/CoordinatesInput';
import DatabaseEntryForm from './components/DatabaseEntryForm/DatabaseEntryForm';
import './App.css'; // Adjust the path as needed

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleConnect = (connectionParams) => {
    console.log('Connecting with params:', connectionParams);
    fetch('http://localhost:4000/DB/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ connectionParams }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    setModalOpen(false); // Close modal after connecting
  };

  const handlePopulate = (coordinates) => {
    console.log('Sending coordinates:', coordinates);
    fetch('http://localhost:4000/DB/populate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinates }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setFormData({
        link: data.streetViewUrl,
        bridgeCoordinates: coordinates, // Set this if you have the data
        imageName: data.imageName,
        imageBox: data.imageBox
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSubmit = (entry) => {
    // Here, you'll send the coordinates to the backend.
    console.log('Sending coordinates:', entry);
    fetch('http://localhost:4000/DB/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <h1>Database Entry Tool</h1>
      <button onClick={() => setModalOpen(true)}>Connect To DB</button>
      <CoordinatesInput onPopulate={handlePopulate} />
      <DatabaseEntryForm onSubmit={handleSubmit}  formData={formData} />
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <ConnectionBox onConnect={handleConnect} />
      </Modal>
    </div>
  );
};

export default App;
