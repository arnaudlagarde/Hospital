import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Données factices de l'hôpital de Corrèze
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Footer;
