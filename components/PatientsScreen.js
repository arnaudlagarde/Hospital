import React, { useState } from 'react';
import { View } from 'react-native';
import PatientList from './PatientList';
import PatientForm from './PatientForm';

const PatientsScreen = () => {
  const [patients, setPatients] = useState([]);
  const [editedPatient, setEditedPatient] = useState(null);

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const handleDeletePatient = (patientId) => {
    const updatedPatients = patients.filter((patient) => patient.id !== patientId);
    setPatients(updatedPatients);
  };

  const handleEditPatient = (patient) => {
    setEditedPatient(patient);
  };

  return (
    <View>
      <PatientList
        patients={patients}
        onDeletePatient={handleDeletePatient}
        onEditPatient={handleEditPatient}
      />
      <PatientForm onSubmit={handleAddPatient} />
    </View>
  );
};

export default PatientsScreen;
