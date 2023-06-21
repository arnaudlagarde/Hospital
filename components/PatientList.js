import React from 'react';
import { View, Text, FlatList } from 'react-native';

const PatientList = ({ patients, onDeletePatient, onEditPatient }) => {
  const renderPatientItem = ({ item }) => {
    return (
      <View>
        <Text>Nom: {item.nom}</Text>
        <Text>Prénom: {item.prenom}</Text>
        {/* Affichez ici les autres informations du patient */}
        <Button title="Supprimer" onPress={() => onDeletePatient(item.id)} />
        <Button title="Modifier" onPress={() => onEditPatient(item.id)} />
      </View>
    );
  };

  return (
    <View>
      <Text>Liste des patients</Text>
      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PatientList;
