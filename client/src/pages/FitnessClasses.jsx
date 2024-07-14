import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FitnessClassList = () => {
  const [fitnessClasses, setFitnessClasses] = useState([]);

  useEffect(() => {
    const fetchFitnessClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fitness_classes');
        setFitnessClasses(response.data);
      } catch (error) {
        console.error('Error fetching fitness classes:', error);
      }
    };

    fetchFitnessClasses();
  }, []);

  return (
    <div>
      <h2>Fitness Class Management</h2>
      <ul>
        {fitnessClasses.map(fitnessClass => (
          <li key={fitnessClass.id}>{fitnessClass.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FitnessClassList;
