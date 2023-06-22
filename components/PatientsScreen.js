import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PatientList from './PatientList';

const PatientsScreen = () => {
  const [patients, setPatients] = useState([]);
  const [editedPatient, setEditedPatient] = useState(null);
  const navigation = useNavigation();

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

  const navigateToAddPatient = () => {
    navigation.navigate('AddPatient');
  };

  return (
    <View>
      <Button title="Créer un nouveau patient" onPress={navigateToAddPatient} />
      <PatientList
        patients={patients}
        onDeletePatient={handleDeletePatient}
        onEditPatient={handleEditPatient}
      />
    </View>
  );
};

export default PatientsScreen;
