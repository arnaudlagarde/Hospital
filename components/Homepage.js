import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const HomePage = (handleLogout) => {
  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

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
      <Image
        source={require('../assets/hospital.jpg')}
        style={styles.backgroundImage}/>
      
      <Header
      
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleRegister={handleRegister}
        />
      {/* <TouchableOpacity onPress={handleLogin}>
        <Text>Connect</Text>
      </TouchableOpacity> */}
      <Content  />
      
      <TouchableOpacity onPress={handleNavigatePatients}>
        <Text style={styles.patient } >Voir la liste des patients</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  patient:{
    left: '22%', 
    right: '50%',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize:18,
    textDecorationLine: 'underline',

  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.80)', // Customize the overlay color and transparency
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default HomePage;
