import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Navbar from './components/Navbar/Navbar';
import logoImg from './assets/Workout-icon.svg'; 

const App: React.FC = () => {
  return (
    <Router>
      <Navbar logoImg={logoImg} logoAlt={'Logo'} />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
