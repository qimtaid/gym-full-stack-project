import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceList() {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await axios.get('/attendances');
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  };

  return (
    <div>
      <h2>Attendance Tracking</h2>
      <ul>
        {attendances.map(attendance => (
          <li key={attendance.id}>{attendance.memberName} - {attendance.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceList;
