import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [date, setDate] = useState('');
  const [fitnessClassId, setFitnessClassId] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage add form visibility
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [editId, setEditId] = useState(null); // State to store the ID of schedule being edited

  useEffect(() => {
    fetchSchedules();
    fetchFitnessClasses(); // Fetch fitness classes for dropdown in form
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const fetchFitnessClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fitness_classes');
      setFitnessClasses(response.data);
    } catch (error) {
      console.error('Error fetching fitness classes:', error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/schedules/${id}`);
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/schedules', { fitness_class_id: fitnessClassId, date });
      setSchedules([...schedules, response.data]);
      setDate('');
      setFitnessClassId('');
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  const handleEditSchedule = (schedule) => {
    setDate(schedule.date);
    setFitnessClassId(schedule.fitness_class.id);
    setEditMode(true);
    setEditId(schedule.id);
    setShowForm(true); // Show the form for editing
  };

  const handleUpdateSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/schedules/${editId}`, { fitness_class_id: fitnessClassId, date });
      const updatedSchedules = schedules.map((schedule) =>
        schedule.id === editId ? response.data : schedule
      );
      setSchedules(updatedSchedules);
      setDate('');
      setFitnessClassId('');
      setEditMode(false);
      setEditId(null);
      setShowForm(false); // Hide the form after successful update
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  return (
    <div className="schedule-list">
      <h2>Schedule List</h2>
      {/* Button to toggle the form */}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Schedule'}
      </button>

      {/* Add/Edit Schedule Form */}
      {showForm && (
        <form onSubmit={editMode ? handleUpdateSchedule : handleAddSchedule} className="mb-3">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="fitnessClass" className="form-label">Fitness Class</label>
              <select className="form-select" id="fitnessClass" value={fitnessClassId} onChange={(e) => setFitnessClassId(e.target.value)} required>
                <option value="">Select Fitness Class</option>
                {fitnessClasses.map(fitnessClass => (
                  <option key={fitnessClass.id} value={fitnessClass.id}>{fitnessClass.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">{editMode ? 'Update Schedule' : 'Add Schedule'}</button>
          {editMode && (
            <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => {
              setEditMode(false);
              setEditId(null);
              setShowForm(false);
              setDate('');
              setFitnessClassId('');
            }}>Cancel</button>
          )}
        </form>
      )}

      {/* Schedule List */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Fitness Class</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.fitness_class.name}</td>
                <td>{schedule.date}</td>
                <td>
                  <button onClick={() => handleEditSchedule(schedule)} className="btn btn-secondary me-2">Edit</button>
                  <button onClick={() => handleDeleteSchedule(schedule.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleList;
