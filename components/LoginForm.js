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
      const response = await axios.get('http://localhost:3000/users/login', {
        params: {
          email: formData.email,
          mot_de_passe: formData.mot_de_passe
        }
      });

      const user = response.data;
      console.log(user);
      if (user) {
        const userData = {
          nom: user.nom,
          prenom: user.prenom,
          admin: user.admin
        };
        setUserData(userData);
        setIsAuthenticated(true);

        if (userData.admin) {
          // Naviguez vers la page souhaitée
        }
      } else {
        setUserData(null);
        setIsAuthenticated(false);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000); // Temps en millisecondes (3 secondes)
      }
    } catch (error) {
      console.log(error);
      setError("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
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
