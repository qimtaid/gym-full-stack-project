// src/pages/Register.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../pages/context/UserContext';

function Register() {
  const { register } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form submitted'); // Debugging log
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    const success = await register(username, email, password);
    if (success) {
      console.log('Registration successful'); // Debugging log
      window.location.href = '/login';
    } else {
      console.log('Registration failed'); // Debugging log
    }
  };

  return (
    <section id="home"  className="bg-light py-3 py-md-5">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3"></div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">REGISTER NEW ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control"
                          name="username"
                          id="username"
                          placeholder="Username"
                          required
                        />
                        <label htmlFor="username" className="form-label">Username</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="name@example.com"
                          required
                        />
                        <label className="form-label">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          className="form-control"
                          name="repeatPassword"
                          id="repeatPassword"
                          placeholder="Confirm Password"
                          required
                        />
                        <label className="form-label">Confirm Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit">Signup</button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">
                        Already have an account? <Link to="/login" className="link-primary text-decoration-none">Login</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
