import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Header = ({ isLoggedIn, handleLogin, handleLogout, handleRegister }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={isLoggedIn ? handleLogout : handleLogin}
      >
        <Text style={styles.buttonText}>
          {isLoggedIn ? 'Déconnexion' : 'Connexion'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          {isLoggedIn ? null : 'Inscription'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  headerButton: {
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Header;
