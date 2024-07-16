import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './context/UserContext'; // Corrected import path
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted'); // Debugging log
    const success = await login(username, password);
    if (success) {
      console.log('Login successful'); // Debugging log
      navigate('/dashboard');
    } else {
      console.log('Login failed'); // Debugging log
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
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">LOGIN</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control"
                          placeholder="username"
                          required
                        />
                        <label className="form-label">Username</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit">
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">
                        Don&apos;t have an account?
                        <Link to="/register" className="link-primary text-decoration-none">Sign Up</Link>
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

export default Login;
