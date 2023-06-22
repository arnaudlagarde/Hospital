import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>
            Téléphone : +1 123 456 789
          </Text>
          <Text style={styles.footerText}>
            Localisation : 1234 Rue de l'Hôpital, 12345 Brive-la-Gaillarde, Corrèze,  France
          </Text>
          <Text style={styles.footerText}>
            Informations complémentaires : Back office de l'hôpital déstiné aux RH, médecins et administrateurs de ces derniers.
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
  copyRightText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});

export default Footer;
