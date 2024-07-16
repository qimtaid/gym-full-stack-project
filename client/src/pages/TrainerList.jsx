import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TrainerList = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/trainers/${id}`);
      setTrainers(trainers.filter((trainer) => trainer.id!== id));
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  return (
    <div className="trainer-list">
      <h2>Trainer List</h2>
      <Link to="/add-trainer" className="btn btn-primary mb-3">Add New Trainer</Link>
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
                <Link to={`/edit-trainer/${trainer.id}`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger ml-2" onClick={() => handleDelete(trainer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerList;