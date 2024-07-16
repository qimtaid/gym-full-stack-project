import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage add form visibility
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [editId, setEditId] = useState(null); // State to store the ID of trainer being edited

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trainers');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/trainers/${id}`);
      setTrainers(trainers.filter((trainer) => trainer.id !== id));
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/trainers', { name, specialty });
      setTrainers([...trainers, response.data]);
      setName('');
      setSpecialty('');
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  };

  const handleEdit = async (trainer) => {
    setName(trainer.name);
    setSpecialty(trainer.specialty);
    setEditMode(true);
    setEditId(trainer.id);
    setShowForm(true); // Show the form for editing
  };

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/trainers/${editId}`, { name, specialty });
      const updatedTrainers = trainers.map((trainer) =>
        trainer.id === editId ? response.data : trainer
      );
      setTrainers(updatedTrainers);
      setName('');
      setSpecialty('');
      setEditMode(false);
      setEditId(null);
      setShowForm(false); // Hide the form after successful update
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  return (
    <div className="trainer-list">
      <h2>Trainer List</h2>
      {/* Button to toggle the form */}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Trainer'}
      </button>

      {/* Add/Edit Trainer Form */}
      {showForm && (
        <form onSubmit={editMode ? handleUpdateTrainer : handleAddTrainer} className="mb-3">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="specialty" className="form-label">Specialty</label>
              <input type="text" className="form-control" id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">{editMode ? 'Update Trainer' : 'Add Trainer'}</button>
          {editMode && (
            <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => {
              setEditMode(false);
              setEditId(null);
              setShowForm(false);
              setName('');
              setSpecialty('');
            }}>Cancel</button>
          )}
        </form>
      )}

      {/* Trainer List */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.name}</td>
              <td>{trainer.specialty}</td>
              <td>
                <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEdit(trainer)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(trainer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerList;
