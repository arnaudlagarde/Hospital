import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/admins');
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderDoctorItem = ({ item }) => {
    return (
      <View style={styles.doctorItem}>
        <Text style={styles.doctorName}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.doctorEmail}>{item.email}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Médecins</Text>
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
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
  doctorItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  doctorEmail: {
    fontSize: 16,
  },
});

export default DoctorList;
