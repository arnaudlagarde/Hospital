import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RhsList = () => {
  const [rhsList, setRhsList] = useState([]);

  useEffect(() => {
    fetchRhsList();
  }, []);

  const fetchRhsList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rhs');
      setRhsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>List of RHs</h2>
      <ul>
        {rhsList.map((rhs) => (
          <li key={rhs._id}>
            <div>
              <strong>Name:</strong> {rhs.firstName} {rhs.lastName}
            </div>
            <div>
              <strong>Email:</strong> {rhs.email}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RhsList;
