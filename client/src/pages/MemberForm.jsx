import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MemberForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [membershipType, setMembershipType] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/members/${id}`)
        .then(response => {
          setName(response.data.name);
          setMembershipType(response.data.membership_type);
        })
        .catch(error => console.error('Error fetching member:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const member = { name, membership_type: membershipType };

    if (id) {
      axios.put(`http://localhost:5000/members/${id}`, member)
        .then(() => history.push('/members'))
        .catch(error => console.error('Error updating member:', error));
    } else {
      axios.post('http://localhost:5000/members', member)
        .then(() => history.push('/members'))
        .catch(error => console.error('Error creating member:', error));
    }
  };

  return (
    <div className="member-form">
      <h2>{id ? 'Edit Member' : 'Add New Member'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Membership Type</label>
          <input type="text" className="form-control" value={membershipType} onChange={(e) => setMembershipType(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update Member' : 'Add Member'}</button>
      </form>
    </div>
  );
}

export default MemberForm;
