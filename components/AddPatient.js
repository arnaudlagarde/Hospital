import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddPatient = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [currentTreatment, setCurrentTreatment] = useState('');

  const handleAddPatient = async () => {
    // Validate the input fields
    if (!firstName || !lastName || !age || !weight || !height || !currentTreatment) {
      alert('Please fill in all the fields.');
      return;
    }

    const newPatient = {
      firstName,
      lastName,
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      currentTreatment,
    };

    try {
      // Send a POST request to create a new patient
      const response = await axios.post('http://localhost:3000/patients', newPatient);
      const createdPatient = response.data;

      // Call the onSubmit function passed from the parent component
      onSubmit(createdPatient);

      // Clear the input fields after submission
      setFirstName('');
      setLastName('');
      setAge('');
      setWeight('');
      setHeight('');
      setCurrentTreatment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Current Treatment"
        value={currentTreatment}
        onChangeText={setCurrentTreatment}
      />
      <Button title="Add Patient" onPress={handleAddPatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddPatient;
