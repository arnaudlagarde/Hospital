import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

const Footer = () => {
  const phoneNumber = '0155432665'; // Replace with your desired phone number

  const handlePhoneNumberPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerTextphone} onPress={handlePhoneNumberPress}>
            Téléphone : {phoneNumber}
          </Text>
          <Text style={styles.footerText}>
            Localisation : 1234 Rue de l'Hôpital, 12345 Brive-la-Gaillarde, Corrèze,  France
          </Text>
          <Text style={styles.footerText}>
            Informations complémentaires : Le back office de l'hôpital est destiné aux RH, aux médecins et aux administrateurs de ces derniers.
          </Text>
        </View>
        <Text style={styles.copyRightText}>
          © 2023 Hôpital de Corrèze. Tous droits réservés.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContent: {
    marginBottom: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  footerTextphone: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  copyRightText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});

export default Footer;
