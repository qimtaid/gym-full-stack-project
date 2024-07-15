import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const FitnessClassList = () => {
  const [fitnessClasses, setFitnessClasses] = useState([]);

  useEffect(() => {
    const fetchFitnessClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fitness-classes');
        setFitnessClasses(response.data);
      } catch (error) {
        console.error('Error fetching fitness classes:', error);
      }
    };

    fetchFitnessClasses();
  }, []);

  return (
    <div className="fitness-class-list">
      <h2>Fitness Class List</h2>
      <Link to="/add-fitness-class" className="btn btn-primary mb-3">Add New Fitness Class</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Trainer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fitnessClasses.map(fitnessClass => (
            <tr key={fitnessClass.id}>
              <td>{fitnessClass.name}</td>
              <td>{fitnessClass.trainer.name}</td>
              <td>
                <Link to={`/edit-fitness-class/${fitnessClass.id}`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FitnessClassList;
