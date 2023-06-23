import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';

const RHsList = () => {
  const [rhsList, setRhsList] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const fadeAnimation = useState(new Animated.Value(0))[0];

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

  const renderItem = ({ item }) => {
    const isExpanded = item._id === expandedItemId;

    const handleItemPress = () => {
      setExpandedItemId(isExpanded ? null : item._id);
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
});

export default RHsList;
