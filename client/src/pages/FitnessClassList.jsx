import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FitnessClassList() {
  const [fitnessClasses, setFitnessClasses] = useState([]);

  useEffect(() => {
    fetchFitnessClasses();
  }, []);

  const fetchFitnessClasses = async () => {
    try {
      const response = await axios.get('/fitness_classes');
      setFitnessClasses(response.data);
    } catch (error) {
      console.error('Error fetching fitness classes:', error);
    }
  };

  return (
    <div>
      <h2>Fitness Class Management</h2>
      <ul>
        {fitnessClasses.map(fitnessClass => (
          <li key={fitnessClass.id}>{fitnessClass.name} - {fitnessClass.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default FitnessClassList;
