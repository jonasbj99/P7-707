import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import logoImg from './assets/Workout-icon.svg';
import Home from './pages/Home/Home';
import StartWorkout from './pages/StartWorkout/StartWorkout';
import Recording from './pages/Recording/Recording';
import Login from './pages/Login/Login';
import Set from './pages/Set/Set';
import WorkoutOverview from './pages/WorkoutOverview/WorkoutOverview';
import Logs from './pages/Logs/Logs';
import { WorkoutLogs } from './atom/workouts';

import { useAtomValue } from 'jotai';

function App() {
  // Define workout data here
  const workoutData_ = useAtomValue(WorkoutLogs);

  const workoutData = workoutData_.length > 0 ? [workoutData_[workoutData_.length - 1]] : [];


  return (
    <Router>
      <Navbar logoImg={logoImg} logoAlt="Logo" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/start-workout" element={<StartWorkout />} />
        <Route path="/recording" element={<Recording />} />
        <Route path="/set" element={<Set />} />
        <Route path="/workoutoverview" element={<WorkoutOverview workoutData={workoutData} />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
}

export default App;
