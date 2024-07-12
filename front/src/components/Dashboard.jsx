import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Profile fetch error', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {profile.username}</h2>
    </div>
  );
}

export default Dashboard;
