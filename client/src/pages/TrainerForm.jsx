import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TrainerForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/trainers/${id}`)
        .then(response => {
          setName(response.data.name);
          setSpecialty(response.data.specialty);
        })
        .catch(error => console.error('Error fetching trainer:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trainer = { name, specialty };

    if (id) {
      axios.put(`http://localhost:5000/trainers/${id}`, trainer)
        .then(() => history.push('/trainers'))
        .catch(error => console.error('Error updating trainer:', error));
    } else {
      axios.post('http://localhost:5000/trainers', trainer)
        .then(() => history.push('/trainers'))
        .catch(error => console.error('Error creating trainer:', error));
    }
  };

  return (
    <div className="trainer-form">
      <h2>{id ? 'Edit Trainer' : 'Add New Trainer'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Specialty</label>
          <input type="text" className="form-control" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update Trainer' : 'Add Trainer'}</button>
      </form>
    </div>
  );
}

export default TrainerForm;
