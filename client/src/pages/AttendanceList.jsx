import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [members, setMembers] = useState([]);
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [fitnessClassId, setFitnessClassId] = useState('');
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editAttendanceId, setEditAttendanceId] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get('http://localhost:5000/attendance');
        setAttendances(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendances();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchFitnessClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fitness_classes');
        setFitnessClasses(response.data);
      } catch (error) {
        console.error('Error fetching fitness classes:', error);
      }
    };

    fetchFitnessClasses();
  }, []);

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/attendance', {
        memberId,
        fitnessClassId,
        date
      });
      setAttendances([...attendances, response.data]);
      setMemberId('');
      setFitnessClassId('');
      setDate('');
      setShowForm(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error adding attendance:', error);
      setError('Failed to add attendance. Please try again.'); // Set error message
    }
  };

  const handleEditAttendance = async (attendanceId) => {
    try {
      const response = await axios.put(`http://localhost:5000/attendance/${attendanceId}`, {
        memberId,
        fitnessClassId,
        date
      });
      // Update the attendance in the list
      const updatedAttendances = attendances.map(att => {
        if (att.id === attendanceId) {
          return response.data;
        }
        return att;
      });
      setAttendances(updatedAttendances);
      setMemberId('');
      setFitnessClassId('');
      setDate('');
      setEditMode(false);
      setEditAttendanceId(null);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error editing attendance:', error);
      setError('Failed to edit attendance. Please try again.'); // Set error message
    }
  };

  const handleDeleteAttendance = async (attendanceId) => {
    try {
      await axios.delete(`http://localhost:5000/attendance/${attendanceId}`);
      // Filter out the deleted attendance from the list
      const updatedAttendances = attendances.filter(att => att.id !== attendanceId);
      setAttendances(updatedAttendances);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error deleting attendance:', error);
      setError('Failed to delete attendance. Please try again.'); // Set error message
    }
  };

  const handleEditButtonClick = (attendanceId) => {
    const attendanceToEdit = attendances.find(att => att.id === attendanceId);
    if (attendanceToEdit) {
      setMemberId(attendanceToEdit.member.id);
      setFitnessClassId(attendanceToEdit.fitness_class.id);
      setDate(attendanceToEdit.date);
      setEditMode(true);
      setEditAttendanceId(attendanceId);
      setShowForm(true);
    }
  };

  return (
    <div className="attendance-list">
      <h2>Attendance List</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add New Attendance'}
      </button>

      {/* Add/Edit Attendance Form */}
      {showForm && (
        <form onSubmit={editMode ? () => handleEditAttendance(editAttendanceId) : handleAddAttendance} className="mb-3">
          <div className="row g-3">
            <div className="col-sm-4">
              <label htmlFor="memberId" className="form-label">Member</label>
              <select
                className="form-control"
                id="memberId"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
              >
                <option value="">Select Member</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-4">
              <label htmlFor="fitnessClassId" className="form-label">Fitness Class</label>
              <select
                className="form-control"
                id="fitnessClassId"
                value={fitnessClassId}
                onChange={(e) => setFitnessClassId(e.target.value)}
                required
              >
                <option value="">Select Fitness Class</option>
                {fitnessClasses.map(fc => (
                  <option key={fc.id} value={fc.id}>{fc.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-4">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">{editMode ? 'Edit Attendance' : 'Add Attendance'}</button>
          {error && <div className="text-danger mt-2">{error}</div>} {/* Display error message if there's an error */}
        </form>
      )}

      {/* Attendance List */}
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
                <button onClick={() => handleEditButtonClick(attendance.id)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDeleteAttendance(attendance.id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
