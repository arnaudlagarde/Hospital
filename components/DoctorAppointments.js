import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Ici, vous pouvez récupérer les rendez-vous à venir pour le médecin actuellement connecté depuis votre backend ou une source de données.

    // Exemple de données statiques pour illustrer l'affichage des rendez-vous
    const dummyAppointments = [
      { id: 1, patientName: 'John Doe', date: '2023-06-25', time: '10:00 AM' },
      { id: 2, patientName: 'Jane Smith', date: '2023-06-26', time: '2:30 PM' },
      // ... Ajoutez d'autres rendez-vous ici ...
    ];

    setAppointments(dummyAppointments);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rendez-vous à venir</Text>
      {appointments.map(appointment => (
        <View key={appointment.id} style={styles.appointment}>
          <Text style={styles.patientName}>{appointment.patientName}</Text>
          <Text>Date: {appointment.date}</Text>
          <Text>Heure: {appointment.time}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  appointment: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  patientName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DoctorAppointments;
