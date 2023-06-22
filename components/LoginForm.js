import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, Button, Alert, Text } from 'react-native';

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
  
      const { success } = response.data;
      if (success) {
        // L'utilisateur est un administrateur
        console.log('Vous êtes connecté !');
        // Effectuez ici l'action souhaitée pour les administrateurs
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
    return <Text>Connexion en cours...</Text>;
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
        required
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={formData.mot_de_passe}
        onChangeText={text => handleChange('mot_de_passe', text)}
        required
      />
      <Button title="Envoyer" onPress={handleSubmit} />
      {showMessage && (
        <View>
          {error && <Text>{error}</Text>}
        </View>
      )}
    </View>
  );
};

export default LoginForm;
