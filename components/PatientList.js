import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedWeight, setEditedWeight] = useState('');
  const [editedHeight, setEditedHeight] = useState('');
  const [editedTreatment, setEditedTreatment] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/patients');
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPatient = (patient) => {
    setEditedPatient(patient);
    setEditedFirstName(patient.firstName);
    setEditedLastName(patient.lastName);
    setEditedAge(patient.age.toString());
    setEditedWeight(patient.weight.toString());
    setEditedHeight(patient.height.toString());
    setEditedTreatment(patient.currentTreatment);
    setIsModalVisible(true);
  };

  const handleUpdatePatient = async () => {
    try {
      const updatedPatient = {
        firstName: editedFirstName,
        lastName: editedLastName,
        age: parseInt(editedAge),
        weight: parseInt(editedWeight),
        height: parseInt(editedHeight),
        currentTreatment: editedTreatment,
      };

      await axios.put(`http://localhost:3000/patients/${editedPatient._id}`, updatedPatient);
      setIsModalVisible(false);
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const renderPatientItem = ({ item }) => {
    return (
      <View style={styles.patientItem}>
        <Text style={styles.patientName}>Nom : {item.firstName} {item.lastName}</Text>
        <Text style={styles.patientDetails}>Âge : {item.age}</Text>
        <Text style={styles.patientDetails}>Poids : {item.weight} kg</Text>
        <Text style={styles.patientDetails}>Taille : {item.height} cm</Text>
        <Text style={styles.patientDetails}>Traitement du patient : {item.currentTreatment}</Text> 
        <Button title="Modifier" onPress={() => handleEditPatient(item)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Patients</Text>
      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        keyExtractor={(item) => item._id}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <AntDesign name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Modifier le Patient</Text>
          <React.Fragment>
  {(localStorage.getItem("role") === "rh" || localStorage.getItem("role") === "admin") && (
    <React.Fragment>
      <TextInput
        style={styles.input}
        value={editedFirstName}
        onChangeText={setEditedFirstName}
        placeholder="Prénom"
      />
      <TextInput
        style={styles.input}
        value={editedLastName}
        onChangeText={setEditedLastName}
        placeholder="Nom"
      />
      <TextInput
        style={styles.input}
        value={editedAge}
        onChangeText={setEditedAge}
        placeholder="Âge"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={editedWeight}
        onChangeText={setEditedWeight}
        placeholder="Poids (kg)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={editedHeight}
        onChangeText={setEditedHeight}
        placeholder="Taille (cm)"
        keyboardType="numeric"
      />
    </React.Fragment>
  )}
  {(localStorage.getItem("role") === "doctor" &&
  <TextInput
    style={styles.input}
    value={editedTreatment}
    onChangeText={setEditedTreatment}
    placeholder="Traitement en cours"
  />
  )}
</React.Fragment>

          <Button title="Mettre à jour" onPress={handleUpdatePatient} />
          <Button title="Annuler" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  patientItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  patientDetails: {
    fontSize: 16,
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default PatientList;
