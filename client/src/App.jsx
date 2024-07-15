import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MemberList from './pages/MemberList';
import TrainerList from './pages/TrainerList';
import FitnessClassList from './pages/FitnessClassList';
import { UserProvider } from './pages/context/UserContext';
import { TaskProvider } from './pages/context/TaskContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
              <Route path='members' element={<MemberList />} />
              <Route path='trainers' element={<TrainerList />} />
              <Route path='fitness-classes' element={<FitnessClassList />} />
              <Route path='*' element={<NoPage />} />
            </Route>
          </Routes>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
