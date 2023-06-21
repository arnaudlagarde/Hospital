import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const HomePage = ({ isLoggedIn, handleLogout }) => {
  const navigation = useNavigation();

  const handleNavigatePatients = () => {
    navigation.navigate('Patients');
  };

  const handleLogin = () => {
    navigation.navigate('Connexion');
  }

  return (
    <View>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <TouchableOpacity onPress={handleNavigatePatients}>
        <Text>Go to Patients List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Connect</Text>
      </TouchableOpacity>
      <Content />
      <Footer />
    </View>
  );
};

export default HomePage;
