const express = require('express');
const app = express();
const PORT = 3000;

// Sample data for patients
const patients = [
  { id: 1, name: 'John Doe', age: 40 },
  { id: 2, name: 'Jane Smith', age: 35 },
  { id: 3, name: 'Michael Johnson', age: 55 },
];

// GET request to retrieve patients
app.get('/patients', (req, res) => {
  res.json(patients);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
