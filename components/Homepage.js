import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const HomePage = () => {
  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté lors du chargement du composant
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    setIsLoggedIn(isAuthenticated);
  }, []);

  const handleNavigatePatients = () => {
    navigation.navigate('Patients');
  };

  const handleLogin = () => {
    navigation.navigate('Connexion');
  };

  const handleRegister = () => {
    navigation.navigate('Inscription');
  };

  return (
    <View style={styles.container}>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    
      <TouchableOpacity onPress={handleLogin}>
        <Text>Connect</Text>
      </TouchableOpacity>
      <Content />
      
      {isLoggedIn && (
      <TouchableOpacity onPress={handleNavigatePatients}>
        <Text>Voir la liste des patients</Text>
      </TouchableOpacity>
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
