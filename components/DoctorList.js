import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import axios from 'axios';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const transitionRef = React.useRef();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoctorPress = (doctor) => {
    transitionRef.current.animateNextTransition();
    setSelectedDoctor((prevDoctor) => (prevDoctor?.email === doctor.email ? null : doctor));
  };

  const renderDoctorItem = ({ item }) => {
    const isSelected = selectedDoctor && selectedDoctor.email === item.email;

    const handleEdit = () => {
      // Handle the edit functionality here
      console.log('Edit doctor:', item);
    };

    const handleDelete = () => {
      // Handle the delete functionality here
      console.log('Delete doctor:', item);
    };

    return (
      <TouchableOpacity
        style={[styles.doctorItem, isSelected && styles.selectedDoctorItem]}
        onPress={() => handleDoctorPress(item)}
      >
        <View style={styles.doctorHeader}>
          <Text style={styles.doctorName}>{item.firstName} {item.lastName}</Text>
          {isSelected && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {isSelected && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Email: {item.email}</Text>
            <Text style={styles.detailsText}>Role: {item.role}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Médecins</Text>
      <Transitioning.View ref={transitionRef} transition={transition}>
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.email}
        />
      </Transitioning.View>
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
  selectedDoctorItem: {
    marginBottom: 0,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#2980b9',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default DoctorList;
