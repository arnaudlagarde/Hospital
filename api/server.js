const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;
require('dotenv').config(); // Load environment variables

// Connection to MongoDB Atlas
mongoose
  .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@atlascluster.mnsfuag.mongodb.net/Hospital?retryWrites=true&w=majority`, {
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
  id: Number,
  firstName: String,
  lastName: String,
  age: Number,
  weight: Number,
  height: Number,
  currentTreatment: [String],
});

const Patients = mongoose.model('Patients', patientSchema);

app.use(express.json());
app.use(cors());

// Create a patient
app.post('/patients', async (req, res) => {
  try {
    const { id, firstName, lastName, age, weight, height, currentTreatment } = req.body;
    const patient = new Patients({ id, firstName, lastName, age, weight, height, currentTreatment });
    await patient.save();
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read all patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patients.find();
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read a specific patient
app.get('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patients.findOne({ id });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a patient
app.put('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age, weight, height, currentTreatment } = req.body;
    const updatedPatient = await Patients.findOneAndUpdate(
      { id },
      { firstName, lastName, age, weight, height, currentTreatment },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a patient
app.delete('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patients.findOneAndDelete({ id });
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(deletedPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
