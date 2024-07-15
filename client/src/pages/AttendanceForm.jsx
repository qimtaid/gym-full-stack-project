import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const AttendanceForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [memberId, setMemberId] = useState('');
  const [fitnessClassId, setFitnessClassId] = useState('');
  const [members, setMembers] = useState([]);
  const [fitnessClasses, setFitnessClasses] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    const fetchFitnessClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fitness-classes');
        setFitnessClasses(response.data);
      } catch (error) {
        console.error('Error fetching fitness classes:', error);
      }
    };

    fetchMembers();
    fetchFitnessClasses();
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/attendances/${id}`)
        .then(response => {
          setDate(response.data.date);
          setMemberId(response.data.member_id);
          setFitnessClassId(response.data.fitness_class_id);
        })
        .catch(error => console.error('Error fetching attendance:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const attendance = { date, member_id: memberId, fitness_class_id: fitnessClassId };

    if (id) {
      axios.put(`http://localhost:5000/attendances/${id}`, attendance)
        .then(() => history.push('/attendances'))
        .catch(error => console.error('Error updating attendance:', error));
    } else {
      axios.post('http://localhost:5000/attendances', attendance)
        .then(() => history.push('/attendances'))
        .catch(error => console.error('Error creating attendance:', error));
    }
  };

  return (
    <div className="attendance-form">
      <h2>{id ? 'Edit Attendance' : 'Add New Attendance'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Member</label>
          <select className="form-control" value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
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
        <button type="submit" className="btn btn-primary">{id ? 'Update Attendance' : 'Add Attendance'}</button>
      </form>
    </div>
  );
}

export default AttendanceForm;
