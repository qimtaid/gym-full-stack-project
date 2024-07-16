import React from 'react';
import '../App.css';

export default function About() {
  return (
    <div className="container mt-4">
      <div className="about-section text-center">
        <h2 className="mb-4">About Gym Management System</h2>
        <div className="about-content">
          <p className="mb-3">
            The Gym Management System is a comprehensive application designed to manage various aspects of a gym,
            including members, trainers, fitness classes, schedules, attendance, and payments.
          </p>
          <p className="mb-3">
            This system is built using React for the frontend and Flask for the backend, providing a modern and
            efficient solution for gym owners and administrators.
          </p>
          <p>
            For more information or to contribute, please visit our <a href="https://github.com/qimtaid" target="_blank" rel="noopener noreferrer">GitHub repository</a> or contact our team.
          </p>
        </div>
      </div>
    </div>
  );
}
