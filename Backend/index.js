// index.js (updated)
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- API Endpoints ---

// A simple test route
app.get('/', (req, res) => {
  res.send('Samudra Sathi API is running!');
});

// NEW: Endpoint to get all reports from the database
app.get('/api/reports', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, incident_type, description, status FROM reports');
    res.json(rows); // Send the database rows as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});