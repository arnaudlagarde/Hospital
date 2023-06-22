import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const HomePage = () => {
  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  
  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté lors du chargement du composant
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    setIsLoggedIn(isAuthenticated);
    const storedName = localStorage.getItem('nom'); // Récupérer le nom depuis le localStorage
    if (storedName) {
      setUserName(storedName); // Stocker le nom dans l'état
    }
    const storedFirstName = localStorage.getItem('prenom');
    if (storedFirstName) {
      setUserFirstName(storedFirstName);
    }
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
        setIsLoggedIn={setIsLoggedIn}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
      {isLoggedIn && userName && (
        <Text style={styles.heading}>Bonjour {userName} {userFirstName}</Text>
      )}

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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default HomePage;
