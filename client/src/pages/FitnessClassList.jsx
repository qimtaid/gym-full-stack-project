import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const FitnessClassList = () => {
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [name, setName] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to manage add form visibility
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [editId, setEditId] = useState(null); // State to store the ID of fitness class being edited

  useEffect(() => {
    fetchFitnessClasses();
    fetchTrainers(); // Fetch trainers for dropdown in form
  }, []);

  const fetchFitnessClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fitness_classes');
      setFitnessClasses(response.data);
    } catch (error) {
      console.error('Error fetching fitness classes:', error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trainers');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleDeleteFitnessClass = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/fitness_classes/${id}`);
      setFitnessClasses(fitnessClasses.filter(fitnessClass => fitnessClass.id !== id));
    } catch (error) {
      console.error('Error deleting fitness class:', error);
    }
  };

  const handleAddFitnessClass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/fitness_classes', { name, trainer_id: trainerId });
      setFitnessClasses([...fitnessClasses, response.data]);
      setName('');
      setTrainerId('');
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding fitness class:', error);
    }
  };

  const handleEditFitnessClass = (fitnessClass) => {
    setName(fitnessClass.name);
    setTrainerId(fitnessClass.trainer.id);
    setEditMode(true);
    setEditId(fitnessClass.id);
    setShowForm(true); // Show the form for editing
  };

  const handleUpdateFitnessClass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/fitness_classes/${editId}`, { name, trainer_id: trainerId });
      const updatedFitnessClasses = fitnessClasses.map((fitnessClass) =>
        fitnessClass.id === editId ? response.data : fitnessClass
      );
      setFitnessClasses(updatedFitnessClasses);
      setName('');
      setTrainerId('');
      setEditMode(false);
      setEditId(null);
      setShowForm(false); // Hide the form after successful update
    } catch (error) {
      console.error('Error updating fitness class:', error);
    }
  };

  return (
    <div className="fitness-class-list">
      <h2>Fitness Class List</h2>
      {/* Button to toggle the form */}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Fitness Class'}
      </button>

      {/* Add/Edit Fitness Class Form */}
      {showForm && (
        <form onSubmit={editMode ? handleUpdateFitnessClass : handleAddFitnessClass} className="mb-3">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="trainer" className="form-label">Trainer</label>
              <select className="form-select" id="trainer" value={trainerId} onChange={(e) => setTrainerId(e.target.value)} required>
                <option value="">Select Trainer</option>
                {trainers.map(trainer => (
                  <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">{editMode ? 'Update Fitness Class' : 'Add Fitness Class'}</button>
          {editMode && (
            <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => {
              setEditMode(false);
              setEditId(null);
              setShowForm(false);
              setName('');
              setTrainerId('');
            }}>Cancel</button>
          )}
        </form>
      )}

      {/* Fitness Class List */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Trainer</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fitnessClasses.map(fitnessClass => (
              <tr key={fitnessClass.id}>
                <td>{fitnessClass.name}</td>
                <td>{fitnessClass.trainer.name}</td>
                <td>
                  <button onClick={() => handleEditFitnessClass(fitnessClass)} className="btn btn-secondary me-2">Edit</button>
                  <button onClick={() => handleDeleteFitnessClass(fitnessClass.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FitnessClassList;
