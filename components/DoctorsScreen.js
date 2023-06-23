import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DoctorList from './DoctorList';
import AddDoctor from './AddDoctor';

const DoctorsScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [editedDoctor, setEditedDoctor] = useState(null);
  const navigation = useNavigation();

  const handleAddDoctor = (newDoctor) => {
    setDoctors([...doctors, newDoctor]);
  };

  const handleDeleteDoctor = (doctorId) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
    setDoctors(updatedDoctors);
  };

  const handleEditDoctor = (doctor) => {
    setEditedDoctor(doctor);
  };

  const navigateToAddDoctor = () => {
    navigation.navigate('AddDoctor');
  };

  return (
    <View>
      <Button title="Créer un nouveau médecin" onPress={navigateToAddDoctor} />
      <AddDoctor onSubmit={handleAddDoctor}/>
      <DoctorList
        doctors={doctors}
        onDeleteDoctor={handleDeleteDoctor}
        onEditDoctor={handleEditDoctor}
      />
    </View>
  );
};


export default DoctorsScreen;
