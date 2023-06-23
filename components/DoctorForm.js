import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const DoctorForm = ({ onSubmit }) => {
  const [role,setRole] = useState('doctor');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Ajoutez ici les autres champs du formulaire

  const handleSubmit = () => {
    console.log('ici');
    const newDoctor = {
      role,
      nom,
      prenom,
      email,
      password,
      // Ajoutez ici les autres champs du formulaire
    };

    onSubmit(newDoctor);
    setNom('');
    setPrenom('');
    setEmail('');
    setPassword('');
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
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
        />
        {/* Ajoutez ici les autres champs du formulaire */}
        <Button title="Ajouter" onPress={handleSubmit} />
      </View>
    );
  };  

export default DoctorForm;
