import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';

const LoginForm = ({ setUserData, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: ''
  });
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/users/admins/verify', {
        email: formData.email,
        password: formData.mot_de_passe
      });

      const { success, role, firstName, lastName } = response.data;
      if (success) {
        // L'utilisateur est un administrateur
        console.log('Vous êtes connecté !');
        console.log(lastName + ' ' + role);
        // Effectuez ici l'action souhaitée pour les administrateurs
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', role); // Enregistrez le rôle réel de l'utilisateur
        localStorage.setItem('nom', lastName);
        localStorage.setItem('prenom', firstName);
      } else {
        // L'utilisateur n'est pas un administrateur ou les informations d'identification sont incorrectes
        console.log('Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.log(error);
      setError("Une erreur s'est produite lors de la vérification de l'utilisateur.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Temps en millisecondes (3 secondes)
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Text style={styles.loadingText}>Connexion en cours...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans le back-office</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={formData.mot_de_passe}
        onChangeText={(text) => handleChange('mot_de_passe', text)}
        required
      />
      <Button title="Envoyer" onPress={handleSubmit} />
      {showMessage && (
        <View style={styles.messageContainer}>
          {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  loadingText: {
    textAlign: 'center',
  },
  messageContainer: {
    marginTop: 12,
  },
  errorMessage: {
    color: 'red',
  },
});

export default LoginForm;
