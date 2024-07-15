import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/schedules');
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div className="schedule-list">
      <h2>Schedule List</h2>
      <Link to="/add-schedule" className="btn btn-primary mb-3">Add New Schedule</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fitness Class</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.fitness_class.name}</td>
              <td>{schedule.date}</td>
              <td>
                <Link to={`/edit-schedule/${schedule.id}`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleList;
