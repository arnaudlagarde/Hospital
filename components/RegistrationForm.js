import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



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
    <View>
      <TextInput
        placeholder="Prénom"
        onChangeText={text => setPrenom(text)}
        value={prenom}
      />
      <TextInput
        placeholder="Nom"
        onChangeText={text => setNom(text)}
        value={nom}
      />
      <TextInput
        placeholder="E-mail"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      
      {/* Champs supplémentaires pour l'inscription */}
      <TextInput
        placeholder="Confirmez le mot de passe"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
      />

      {/* Champ d'inscription pour le rôle avec liste déroulante */}
      <Picker
        selectedValue={role}
        onValueChange={itemValue => setRole(itemValue)}
      >
        <Picker.Item label="Sélectionnez un rôle" value="" />
        {roles.map((role, index) => (
          <Picker.Item label={role} value={role} key={index} />
        ))}
      </Picker>

      {/* Bouton d'inscription */}
      <Button title="S'inscrire" onPress={handleRegister} />

      {/* Déjà inscrit ? */}
      <TouchableOpacity onPress={handleLogin}>
        <Text>Déjà inscrit ? Connectez-vous ici.</Text>
      </TouchableOpacity>

      {/* Bouton de connexion */}
      <Button title="Se connecter" onPress={handleLogin} />

      {/* Mot de passe oublié */}
      <TouchableOpacity>
        <Text>Mot de passe oublié ? Cliquez ici.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationForm;
