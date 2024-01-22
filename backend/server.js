const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 4000;

// Middleware to parse JSON bodies with increased limit
app.use(express.json({ limit: '4000mb' })); // Set limit to 50MB or whatever size you need
app.use(cors());

app.use('/DB', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
