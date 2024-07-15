import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get('http://localhost:5000/attendances');
        setAttendances(response.data);
      } catch (error) {
        console.error('Error fetching attendances:', error);
      }
    };

    fetchAttendances();
  }, []);

  return (
    <div className="attendance-list">
      <h2>Attendance List</h2>
      <Link to="/add-attendance" className="btn btn-primary mb-3">Add New Attendance</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Member</th>
            <th>Fitness Class</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map(attendance => (
            <tr key={attendance.id}>
              <td>{attendance.member.name}</td>
              <td>{attendance.fitness_class.name}</td>
              <td>{attendance.date}</td>
              <td>
                <Link to={`/edit-attendance/${attendance.id}`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
