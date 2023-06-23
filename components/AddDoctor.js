import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddDoctor = ({ onSubmit }) => {
  const [role, setRole] = useState('doctor');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleAddDoctor = async () => {
    // Valider les champs de saisie
    if (!role || !firstName || !lastName || !email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const newDoctor = {
      role,
      firstName,
      lastName,
      email,
      password,
    };

    try {
      // Envoyer une requête POST pour créer un nouveau medecin
      const response = await axios.post('http://localhost:3000/users/admins', newDoctor);
      const createdDoctor = response.data;

      // Appeler la fonction onSubmit passée depuis le composant parent
      onSubmit(createdDoctor);

      // Vider les champs de saisie après la soumission
      setRole('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Ajouter un médecin" onPress={handleAddDoctor} />
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

export default AddDoctor;
