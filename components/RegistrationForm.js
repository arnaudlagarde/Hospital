import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      const data = {
        role: role,
        firstName: prenom,
        lastName: nom,
        email: email,
        password: password,
      };

      try {
        const response = await axios.post('http://localhost:3000/users/admins', data);
        console.log(response.data); // Affiche la réponse du serveur dans la console
        Alert.alert('Inscription', 'Inscription réussie !');
        navigation.navigate('Home');
      } catch (error) {
        console.error(error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'inscription.');
      }
    } else {
      Alert.alert('Inscription', 'Les mots de passe ne correspondent pas !');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Connexion');
  };

  const roles = ['Medecin', 'Administrateur', 'RH'];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        onChangeText={text => setPrenom(text)}
        value={prenom}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        onChangeText={text => setNom(text)}
        value={nom}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmez le mot de passe"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
      />

      <Picker
        selectedValue={role}
        onValueChange={itemValue => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez un rôle" value="" />
        {roles.map((role, index) => (
          <Picker.Item label={role} value={role} key={index} />
        ))}
      </Picker>

      <Button title="S'inscrire" onPress={handleRegister} />

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.linkText}>Déjà inscrit ? Connectez-vous ici.</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.linkText}>Mot de passe oublié ? Cliquez ici.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    width: '100%',
    marginBottom: 16,
  },
  linkText: {
    color: 'blue',
    marginTop: 8,
  },
});

export default RegistrationForm;
