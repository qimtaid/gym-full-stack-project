import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const FitnessClassForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/trainers');
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/fitness-classes/${id}`)
        .then(response => {
          setName(response.data.name);
          setTrainerId(response.data.trainer_id);
        })
        .catch(error => console.error('Error fetching fitness class:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fitnessClass = { name, trainer_id: trainerId };

    if (id) {
      axios.put(`http://localhost:5000/fitness-classes/${id}`, fitnessClass)
        .then(() => navigate('/fitness-classes'))
        .catch(error => console.error('Error updating fitness class:', error));
    } else {
      axios.post('http://localhost:5000/fitness-classes', fitnessClass)
        .then(() => navigate('/fitness-classes'))
        .catch(error => console.error('Error creating fitness class:', error));
    }
  };

  return (
    <div className="fitness-class-form">
      <h2>{id ? 'Edit Fitness Class' : 'Add New Fitness Class'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Trainer</label>
          <select className="form-control" value={trainerId} onChange={(e) => setTrainerId(e.target.value)} required>
            <option value="">Select Trainer</option>
            {trainers.map(trainer => (
              <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update Fitness Class' : 'Add Fitness Class'}</button>
      </form>
    </div>
  );
}

export default FitnessClassForm;
