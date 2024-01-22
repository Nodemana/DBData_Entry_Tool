import React, { useState } from 'react';

const ConnectionBox = ({ onConnect }) => {
  const [hostname, setHostname] = useState('192.168.1.186');
  const [port, setPort] = useState('5432');
  const [database, setDatabase] = useState('sdb');
  const [user, setUser] = useState('postgres');
  const [password, setPassword] = useState('123');

  const handleSubmit = (event) => {
    event.preventDefault();
    onConnect({ hostname, port, database, user, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={hostname}
        onChange={(e) => setHostname(e.target.value)}
        placeholder="Hostname"
      />
      <input
        type="text"
        value={port}
        onChange={(e) => setPort(e.target.value)}
        placeholder="Port"
      />
      <input
        type="text"
        value={database}
        onChange={(e) => setDatabase(e.target.value)}
        placeholder="Database"
      />
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="User"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Connect</button>
    </form>
  );
};

export default ConnectionBox;
