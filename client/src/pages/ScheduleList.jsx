import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScheduleList() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  return (
    <div>
      <h2>Schedule Management</h2>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>{schedule.date} - {schedule.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleList;
