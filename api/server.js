const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Connection to MongoDB Atlas
mongoose
  .connect('mongodb+srv://Arneau:N123456789@atlascluster.mnsfuag.mongodb.net/Hospital?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Schema and model for the patient
const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  weight: Number,
  height: Number,
  currentTreatment: [String],
});

const Patient = mongoose.model('Patient', patientSchema);

// GET request to fetch patients
app.get('/patients', (req, res) => {
  Patient.find({}, (error, patients) => {
    if (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Error fetching patients' });
    } else {
      res.json(patients);
    }
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
