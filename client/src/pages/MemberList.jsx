import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage add form visibility
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [editId, setEditId] = useState(null); // State to store the ID of member being edited

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

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/members', { name, membership_type: membershipType });
      setMembers([...members, response.data]);
      setName('');
      setMembershipType('');
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleEditMember = (member) => {
    setName(member.name);
    setMembershipType(member.membership_type);
    setEditMode(true);
    setEditId(member.id);
    setShowForm(true); // Show the form for editing
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/members/${editId}`, { name, membership_type: membershipType });
      const updatedMembers = members.map((member) =>
        member.id === editId ? response.data : member
      );
      setMembers(updatedMembers);
      setName('');
      setMembershipType('');
      setEditMode(false);
      setEditId(null);
      setShowForm(false); // Hide the form after successful update
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Members List</h2>
      {/* Button to toggle the form */}
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Member'}
      </button>

      {/* Add/Edit Member Form */}
      {showForm && (
        <form onSubmit={editMode ? handleUpdateMember : handleAddMember} className="mb-3">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="membershipType" className="form-label">Membership Type</label>
              <input type="text" className="form-control" id="membershipType" value={membershipType} onChange={(e) => setMembershipType(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">{editMode ? 'Update Member' : 'Add Member'}</button>
          {editMode && (
            <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => {
              setEditMode(false);
              setEditId(null);
              setShowForm(false);
              setName('');
              setMembershipType('');
            }}>Cancel</button>
          )}
        </form>
      )}

      {/* Member List */}
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
                  <button onClick={() => handleEditMember(member)} className="btn btn-sm btn-primary me-2">Edit</button>
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
