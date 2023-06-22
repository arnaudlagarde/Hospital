const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;
require('dotenv').config(); // Charger les variables d'environnement


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
  email: String,
  password: String,
  age: Number,
  weight: Number,
  height: Number,
  currentTreatment: [String],
});

const Patients = mongoose.model('Patients', patientSchema);

const adminSchema = new mongoose.Schema({
  role: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Administrateurs = mongoose.model('Admin',adminSchema);

app.use(express.json());

// POST request for API users/admins
app.post('/users/admins', async (req, res) => {
  try {
    const { role, firstName, lastName, email, password } = req.body;
    const admin = { role, firstName, lastName, email, password };
    // Save admin to the database
    // ...
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST request for API users/patients
app.post('/users/patients', async (req, res) => {
  try {
    const { id, firstName, lastName, age, weight, height, currentTreatment } = req.body;
    const patient = { id, firstName, lastName, age, weight, height, currentTreatment };
    // Save patient to the database
    // ...
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
