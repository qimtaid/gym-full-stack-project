import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './context/UserContext';

function Dashboard() {
  const { currentUser } = useContext(UserContext);

  // Handle case where currentUser is null or undefined
  if (!currentUser) {
    return (
      <div>
        <h2>Dashboard</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">Welcome, {currentUser.name}</h3>
          <p className="card-text">Email: {currentUser.email}</p>
        </div>
      </div>

      <div className="card-deck">
        {/* Member Management Card */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Member Management</h5>
            <p className="card-text">Manage gym members.</p>
            <Link to="/members" className="btn btn-primary">
              Go to Members
            </Link>
          </div>
        </div>

        {/* Trainer Management Card */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Trainer Management</h5>
            <p className="card-text">Manage gym trainers.</p>
            <Link to="/trainers" className="btn btn-primary">
              Go to Trainers
            </Link>
          </div>
        </div>

        {/* Fitness Class Management Card */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Fitness Class Management</h5>
            <p className="card-text">Manage fitness classes.</p>
            <Link to="/fitness-classes" className="btn btn-primary">
              Go to Fitness Classes
            </Link>
          </div>
        </div>

        {/* Add more cards for other sections as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
