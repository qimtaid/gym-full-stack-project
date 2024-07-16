import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/members/${id}`);
      setMembers(members.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Members List</h2>
      <Link to="/add-member" className="btn btn-primary mb-3">Add Member</Link>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Membership Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.membership_type}</td>
                <td>
                  <Link to={`/edit-member/${member.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                  <button onClick={() => handleDeleteMember(member.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberList;
