import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

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

  const renderPatientItem = ({ item }) => {
    return (
      <View style={styles.patientItem}>
        <Text style={styles.patientName}>Name: {item.firstName} {item.lastName}</Text>
        <Text style={styles.patientDetails}>Age: {item.age}</Text>
        <Text style={styles.patientDetails}>Weight: {item.weight} kg</Text>
        <Text style={styles.patientDetails}>Height: {item.height} cm</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Patients</Text>
      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        keyExtractor={(item) => item._id}
      />
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
});

export default PatientList;
