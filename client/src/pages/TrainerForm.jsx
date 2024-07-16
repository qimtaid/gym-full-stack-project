import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TrainerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:5000/trainers/${id}`)
        .then(response => {
          setName(response.data.name);
          setSpecialty(response.data.specialty);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching trainer:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !specialty) {
      alert('Please fill in all fields');
      return;
    }

    const trainer = { name, specialty };

    if (id) {
      axios.put(`http://localhost:5000/trainers/${id}`, trainer)
        .then(() => navigate('/trainers'))
        .catch(error => {
          console.error('Error updating trainer:', error);
          alert('Error updating trainer: ' + error.message);
        });
    } else {
      axios.post('http://localhost:5000/trainers', trainer)
        .then(() => navigate('/trainers'))
        .catch(error => {
          console.error('Error creating trainer:', error);
          alert('Error creating trainer: ' + error.message);
        });
    }
  };

  return (
    <div className="trainer-form">
      <h2>{id ? 'Edit Trainer' : 'Add New Trainer'}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      )}
    </div>
  );
}

export default TrainerForm;