import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';

const RHsList = () => {
  const [rhsList, setRhsList] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const fadeAnimation = useState(new Animated.Value(0))[0];
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedRH, setEditedRH] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');

  useEffect(() => {
    fetchRHsList();
  }, []);

  const fetchRHsList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rhs');
      setRhsList(response.data);
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (rh) => {
    setEditedRH(rh);
    setEditedFirstName(rh.firstName);
    setEditedLastName(rh.lastName);
    setEditedEmail(rh.email);
    setEditedPassword(rh.password);
    setIsEditModalVisible(true);
  };

  const updateRH = async () => {
    try {
      const updatedRH = {
        ...editedRH,
        firstName: editedFirstName,
        lastName: editedLastName,
        email: editedEmail,
        password: editedPassword,
      };

      await axios.put(`http://localhost:3000/rhs/${editedRH._id}`, updatedRH);

      setRhsList((prevList) =>
        prevList.map((rh) => (rh._id === editedRH._id ? updatedRH : rh))
      );

      setIsEditModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = item._id === expandedItemId;

    const handleItemPress = () => {
      setExpandedItemId(isExpanded ? null : item._id);
    };

    const handleEditButtonPress = () => {
      openEditModal(item);
    };

    return (
      <Animated.View style={[styles.itemContainer, { opacity: fadeAnimation }]}>
        <TouchableOpacity onPress={handleItemPress} activeOpacity={0.8}>
          <Text style={styles.name}>
            <Text style={styles.label}>Name:</Text> {item.firstName} {item.lastName}
          </Text>
          {isExpanded && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text>{item.email}</Text>
              <Text style={styles.label}>Password:</Text>
              <Text>{item.password}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Button title="Edit" onPress={handleEditButtonPress} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of RHs</Text>
      <FlatList
        data={rhsList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={isEditModalVisible} animationType="slide">
        <View style={styles.editModalContainer}>
          <Text style={styles.editModalTitle}>Edit RH</Text>
          <TextInput
            style={styles.input}
            value={editedFirstName}
            onChangeText={setEditedFirstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={editedLastName}
            onChangeText={setEditedLastName}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={editedPassword}
            onChangeText={setEditedPassword}
            placeholder="Password"
          />
        
          <Button title="Update" onPress={updateRH} />
          <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 8,
  },
  editModalContainer: {
    flex: 1,
    padding: 16,
  },
  editModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default RHsList;
