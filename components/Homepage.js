import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const HomePage = ({ route }) => {
  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userRole, setUserRole] = useState('');

  const isFocused = useIsFocused();

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
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, [isFocused]);

  const handleNavigatePatients = () => {
    navigation.navigate('Patients');
  };

  const handleNavigateDoctors = () => {
    navigation.navigate('Doctors');
  };

  const handleLogin = () => {
    navigation.navigate('Connexion');
  };

  const handleRegister = () => {
    navigation.navigate('Inscription');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/hospital.jpg')}
        style={[styles.backgroundImage, { opacity: 0.4 }]} // Modifier l'opacité ici
      />

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
          <Text style={styles.patient}>Voir la liste des patients</Text>
        </TouchableOpacity>
      )}

      {isLoggedIn && (userRole === "doctor" || userRole === "admin") && (
        <TouchableOpacity onPress={handleNavigateDoctors}>
          <Text style={styles.patient}>Voir la liste des médecins</Text>
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
  patient: {
    left: '22%',
    right: '50%',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default HomePage;
