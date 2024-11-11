import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import logoImg from './assets/Workout-icon.svg';
import Home from './pages/Home/Home';
import CurrentWorkout from './pages/CurrentWorkout/CurrentWorkout';
import Recording from './pages/Recording/Recording';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Navbar logoImg={logoImg} logoAlt="Logo" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/current-workout" element={<CurrentWorkout />} />
        <Route path="/recording" element={<Recording />} />
      </Routes>
    </Router>
  );
}

export default App;
