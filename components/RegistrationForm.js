import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Effectuez ici la logique d'inscription
    if (password === confirmPassword) {
      // Inscription réussie
      Alert.alert('Inscription', 'Inscription réussie !');
    } else {
      // Les mots de passe ne correspondent pas
      Alert.alert('Inscription', 'Les mots de passe ne correspondent pas !');
    }
  };

  const handleLogin = () => {
    // Effectuez ici la logique de connexion
    // Validez l'e-mail et le mot de passe
    if (email && password) {
      // Connexion réussie
      Alert.alert('Connexion', 'Connexion réussie !');
    } else {
      // Identifiants invalides
      Alert.alert('Connexion', 'E-mail ou mot de passe invalide !');
    }
  };

  return (
    <View>
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
