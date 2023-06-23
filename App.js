import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/Homepage';
import PatientsScreen from './components/PatientsScreen';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AddPatient from './components/AddPatient';
import DoctorList from './components/DoctorList';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Patients" component={PatientsScreen} />
        <Stack.Screen name="Connexion" component={LoginForm} />
        <Stack.Screen name="Inscription" component={RegistrationForm} />
        <Stack.Screen name="AddPatient" component={AddPatient} />
        <Stack.Screen name="Doctors" component={DoctorList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
