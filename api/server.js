const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Lecture du fichier JSON des patients
const patientsData = fs.readFileSync('api/data/patients.json');
const patients = JSON.parse(patientsData);

// GET request pour récupérer les patients
app.get('/patients', (req, res) => {
  res.json(patients);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
