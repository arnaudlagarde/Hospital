import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const Content = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.heading}>Hôpital de Corrèze</Text>
      <Text style={styles.description}>
        Notre application est conçue pour répondre aux besoins de gestion des patients et de prise de rendez-vous pour un hôpital situé en Corrèze.
      </Text>
      <Text style={styles.description}>
        Les ressources humaines (RH) peuvent créer et gérer les informations des patients, y compris leur identifiant, nom, prénom, âge, poids, taille et traitement en cours avec une liste de médicaments.
      </Text>
      <Text style={styles.description}>
        Les médecins peuvent accéder à la liste des patients pour consulter rapidement les informations pertinentes et prendre des décisions éclairées.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
    fontWeight: 'bold',
  },

});

export default Content;
