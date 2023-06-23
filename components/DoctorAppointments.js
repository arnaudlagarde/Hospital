import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Here, you can fetch upcoming appointments for the currently logged-in doctor from your backend or a data source.

    // Example static data to illustrate the appointment display
    const dummyAppointments = {
      '2023-06-25': [
        { id: 1, patientName: 'John Doe', time: '10:00 AM' },
        { id: 2, patientName: 'Jane Smith', time: '2:30 PM' },
      ],
      '2023-06-26': [
        { id: 3, patientName: 'Alice Johnson', time: '9:00 AM' },
        { id: 4, patientName: 'Bob Williams', time: '11:30 AM' },
      ],
      '2023-06-27': [
        { id: 5, patientName: 'Emma Davis', time: '3:00 PM' },
        { id: 6, patientName: 'Michael Brown', time: '4:30 PM' },
      ],
      '2023-06-28': [
        { id: 7, patientName: 'Olivia Miller', time: '10:30 AM' },
        { id: 8, patientName: 'William Wilson', time: '1:00 PM' },
        { id: 9, patientName: 'Sophia Taylor', time: '3:30 PM' },
      ],
      // Add more appointments here...
    };

    setAppointments(dummyAppointments);
    setIsLoading(false);
  }, []);

  const renderAppointment = (item) => (
    <View style={styles.appointment}>
      <Text style={styles.patientName}>{item.patientName}</Text>
      <Text>Time: {item.time}</Text>
    </View>
  );

  const renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text>No appointments</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Appointments</Text>
      <Agenda
        items={appointments}
        renderItem={renderAppointment}
        renderEmptyDate={renderEmptyDate}
        pastScrollRange={12} // Allow scrolling to past dates (number of months)
        futureScrollRange={12} // Allow scrolling to future dates (number of months)
        renderEmptyData={() => <View />} // Render an empty view when there are no items for a specific date
        style={styles.agenda} // Apply styles to the Agenda component
        theme={{
          agendaKnobColor: 'gray', // Customize the color of the scroll knob
        }}
      />
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
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agenda: {
    flex: 1, // Make the Agenda component fill the entire screen height
  },
});

export default DoctorAppointments;
