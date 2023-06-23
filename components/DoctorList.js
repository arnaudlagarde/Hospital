import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleEditDoctor = (doctor) => {
    setEditedDoctor(doctor);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/doctors/${editedDoctor._id}`, editedDoctor);
      setModalVisible(false);
      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    // Implement search logic here based on the searchQuery
    // Update the doctors list accordingly
    // You can use the Array.filter method to filter the doctors based on the search query
    // Example: const filteredDoctors = doctors.filter((doctor) => doctor.firstName.includes(searchQuery));

    // Placeholder code to demonstrate the search functionality
    const filteredDoctors = doctors.filter((doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDoctors(filteredDoctors);
  };

  const renderDoctorItem = ({ item }) => {
    const isSelected = selectedDoctor && selectedDoctor.email === item.email;
  
    return (
      <TouchableOpacity
        style={[styles.doctorItem, isSelected && styles.selectedDoctorItem]}
        onPress={() => handleDoctorPress(item)}
      >
        <Text style={styles.doctorName}>{item.firstName} {item.lastName}</Text>
        {isSelected && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Email: {item.email}</Text>
            {/* Add more details as needed */}
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleEditDoctor(item)} />
              <Button title="Delete" onPress={() => handleDeleteDoctor(item._id)} color="red" />
              {/* Set color prop to "red" for the Delete button */}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Médecins</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a doctor"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <Transitioning.View ref={transitionRef} transition={transition}>
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.email}
        />
      </Transitioning.View>
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Doctor</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="First Name"
              value={editedDoctor?.firstName}
              onChangeText={(text) => setEditedDoctor({ ...editedDoctor, firstName: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last Name"
              value={editedDoctor?.lastName}
              onChangeText={(text) => setEditedDoctor({ ...editedDoctor, lastName: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Role"
              value={editedDoctor?.role}
              onChangeText={(text) => setEditedDoctor({ ...editedDoctor, role: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={editedDoctor?.email}
              onChangeText={(text) => setEditedDoctor({ ...editedDoctor, email: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              value={editedDoctor?.password}
              onChangeText={(text) => setEditedDoctor({ ...editedDoctor, password: text })}
            />
            {/* Add more input fields for other properties */}
            <View style={styles.modalButtonContainer}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  doctorItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedDoctorItem: {
    backgroundColor: '#eaf7ff',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default DoctorList;
