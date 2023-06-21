import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const PatientForm = ({ onSubmit }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  // Ajoutez ici les autres champs du formulaire

  const handleSubmit = () => {
    const newPatient = {
      nom,
      prenom,
      // Ajoutez ici les autres champs du formulaire
    };

    onSubmit(newPatient);
    setNom('');
    setPrenom('');
    // Réinitialisez les autres champs du formulaire
  };

  return (
    <View>
      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
      {/* Ajoutez ici les autres champs du formulaire */}
      <Button title="Ajouter" onPress={handleSubmit} />
    </View>
  );
};

export default PatientForm;
