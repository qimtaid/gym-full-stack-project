import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
/* This code snippet is a React component that defines a `TaskProvider` component using the Context
API. Here's a breakdown of what the code is doing: */
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/members");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:5000/members", task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit an existing task
  const editTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/members/${id}`, updatedTask);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const contextData = {
    tasks,
    addTask,
    editTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={contextData}>
      {children}
    </TaskContext.Provider>
  );
};

