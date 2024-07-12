import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TrainerList() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('/trainers');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  return (
    <div>
      <h2>Trainer Management</h2>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer.id}>{trainer.name} - {trainer.specialty}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrainerList;
