import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ScheduleForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [fitnessClassId, setFitnessClassId] = useState('');
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

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/schedules/${id}`)
        .then(response => {
          setDate(response.data.date);
          setFitnessClassId(response.data.fitness_class_id);
        })
        .catch(error => console.error('Error fetching schedule:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const schedule = { date, fitness_class_id: fitnessClassId };

    if (id) {
      axios.put(`http://localhost:5000/schedules/${id}`, schedule)
        .then(() => history.push('/schedules'))
        .catch(error => console.error('Error updating schedule:', error));
    } else {
      axios.post('http://localhost:5000/schedules', schedule)
        .then(() => history.push('/schedules'))
        .catch(error => console.error('Error creating schedule:', error));
    }
  };

  return (
    <div className="schedule-form">
      <h2>{id ? 'Edit Schedule' : 'Add New Schedule'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Fitness Class</label>
          <select className="form-control" value={fitnessClassId} onChange={(e) => setFitnessClassId(e.target.value)} required>
            <option value="">Select Fitness Class</option>
            {fitnessClasses.map(fitnessClass => (
              <option key={fitnessClass.id} value={fitnessClass.id}>{fitnessClass.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update Schedule' : 'Add Schedule'}</button>
      </form>
    </div>
  );
}

export default ScheduleForm;
