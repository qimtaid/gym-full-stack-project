import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MemberList from './pages/MemberList';
import TrainerList from './pages/TrainerList';
import FitnessClassList from './pages/FitnessClassList';
import ScheduleList from './pages/ScheduleList';
import PaymentList from './pages/PaymentList';
import AttendanceList from './pages/AttendanceList';
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
              <Route path='schedules' element={<ScheduleList />} />              
              <Route path='trainers' element={<TrainerList />} />
              <Route path='payments' element={<PaymentList />} />
              <Route path='attendance' element={<AttendanceList />} />
              <Route path='fitness-classes' element={<FitnessClassList />} />
              <Route path='about' element={<About />} />
            </Route>
          </Routes>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
