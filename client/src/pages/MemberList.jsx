import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MemberList = () => {
  const [members, setMembers] = useState([]);

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

  // Function to delete a member
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/members/${id}`);
      if (response.data.success) {
        // Remove the deleted member from the local state
        setMembers(members.filter(member => member.id !== id));
        alert('Member deleted successfully');
      } else {
        alert('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('An error occurred while deleting the member');
    }
  };

  return (
    <div className="member-list">
      <h2>Member List</h2>
      <Link to="/add-member" className="btn btn-primary mb-3">Add New Member</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.membership_type}</td>
              <td>
                <Link to={`/edit-member/${member.id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDelete(member.id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList;
