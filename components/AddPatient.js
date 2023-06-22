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
    // Valider les champs de saisie
    if (!firstName || !lastName || !age || !weight || !height || !currentTreatment) {
      alert('Veuillez remplir tous les champs.');
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
      // Envoyer une requête POST pour créer un nouveau patient
      const response = await axios.post('http://localhost:3000/patients', newPatient);
      const createdPatient = response.data;

      // Appeler la fonction onSubmit passée depuis le composant parent
      onSubmit(createdPatient);

      // Vider les champs de saisie après la soumission
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
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Âge"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Poids (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Taille (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Traitement du patient"
        value={currentTreatment}
        onChangeText={setCurrentTreatment}
      />
      <Button title="Ajouter un patient" onPress={handleAddPatient} />
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
