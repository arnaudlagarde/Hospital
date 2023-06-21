const express = require('express');
const mongoose = require('mongoose');
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

const Patient = mongoose.model('Patients', patientSchema);

// GET request to fetch patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find({});
    console.log(patients)
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
