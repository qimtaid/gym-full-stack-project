import React, { useState } from 'react';
import axios from 'axios';

const MemberForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/members', { name });
      // Optionally, redirect or update state upon successful submission
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Member</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Add Member</button>
    </form>
  );
}

export default MemberForm;
