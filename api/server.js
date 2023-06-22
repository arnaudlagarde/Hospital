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

const adminSchema = new mongoose.Schema({
  role: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Admins = mongoose.model('Admins', adminSchema);

// Schema and model for doctors
const doctorSchema = new mongoose.Schema({
  role: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Doctors = mongoose.model('Doctors', doctorSchema);

// Schema and model for RHs
const rhSchema = new mongoose.Schema({
  role: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const RHs = mongoose.model('RHs', rhSchema);

app.use(express.json());
app.use(cors());

// Create an admin
app.post('/users/admins', async (req, res) => {
  try {
    const { role, firstName, lastName, email, password } = req.body;
    const admin = new Admins({ role, firstName, lastName, email, password });
    await admin.save();
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read all admins
app.get('/users/admins', async (req, res) => {
  try {
    const admins = await Admins.find();
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/users/admins/verify', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admins.findOne({ email, password });
    if (admin) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


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

// Create a doctor
app.post('/doctors', async (req, res) => {
  try {
    const { role, firstName, lastName, email, password } = req.body;
    const doctor = new Doctors({ role, firstName, lastName, email, password });
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read all doctors
app.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctors.find();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read a specific doctor
app.get('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctors.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a doctor
app.put('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role, firstName, lastName, email, password } = req.body;
    const updatedDoctor = await Doctors.findByIdAndUpdate(
      id,
      { role, firstName, lastName, email, password },
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a doctor
app.delete('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctors.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create an RH
app.post('/rhs', async (req, res) => {
  try {
    const { role, firstName, lastName, email, password } = req.body;
    const rh = new RHs({ role, firstName, lastName, email, password });
    await rh.save();
    res.json(rh);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read all RHs
app.get('/rhs', async (req, res) => {
  try {
    const rhs = await RHs.find();
    res.json(rhs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read a specific RH
app.get('/rhs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rh = await RHs.findById(id);
    if (!rh) {
      return res.status(404).json({ error: 'RH not found' });
    }
    res.json(rh);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an RH
app.put('/rhs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role, firstName, lastName, email, password } = req.body;
    const updatedRH = await RHs.findByIdAndUpdate(
      id,
      { role, firstName, lastName, email, password },
      { new: true }
    );
    if (!updatedRH) {
      return res.status(404).json({ error: 'RH not found' });
    }
    res.json(updatedRH);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an RH
app.delete('/rhs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRH = await RHs.findByIdAndDelete(id);
    if (!deletedRH) {
      return res.status(404).json({ error: 'RH not found' });
    }
    res.json({ message: 'RH deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
