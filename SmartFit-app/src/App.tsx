import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import logoImg from './assets/Workout-icon.svg';
import Home from './pages/Home/Home';
import CurrentWorkout from './pages/CurrentWorkout/CurrentWorkout';
import Recording from './pages/Recording/Recording';
import Login from './pages/Login/Login';
import Set from './pages/Set/Set';
import WorkoutOverview from './pages/WorkoutOverview/WorkoutOverview';
import SingleWorkout from './pages/SingleWorkout/SingleWorkout';
import Logs from './pages/Logs/Logs';

function App() {
  // Define workout data here
  const workoutData = [
    { exercise: "Squat", set: 1, reps: 10, weight: "40kg", notes: "" },
    { exercise: "Squat", set: 1, reps: 8, weight: "50kg", notes: "" },
    { exercise: "Deadlift", set: 1, reps: 10, weight: "60kg", notes: "Do more stretching" },
  ];

  return (
    <Router>
      <Navbar logoImg={logoImg} logoAlt="Logo" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/current-workout" element={<CurrentWorkout />} />
        <Route path="/recording" element={<Recording />} />
        <Route path="/set" element={<Set />} />
        <Route path="/workoutoverview" element={<WorkoutOverview workoutData={workoutData} />} />
        <Route path="/singleworkout" element={<SingleWorkout />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
}

export default App;
