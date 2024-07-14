import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(null);

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { username, email, password });
      if (response.data.message) {
        return true;
      } else {
        alert(response.data.error || "Something went wrong");
        return false;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      if (response.data.access_token) {
        setAuthToken(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        setCurrentUser({ name: username });
        return true;
      } else {
        alert(response.data.error || "Something went wrong");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.data.success) {
        setAuthToken(null);
        localStorage.removeItem('token');
        nav('/login');
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:5000/current_user', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then(response => {
        setCurrentUser(response.data);
      }).catch(error => {
        console.error("Error fetching current user:", error);
      });
    } else {
      setCurrentUser(null);
    }
  }, [authToken]);

  const contextData = {
    currentUser,
    register,
    login,
    logout
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
