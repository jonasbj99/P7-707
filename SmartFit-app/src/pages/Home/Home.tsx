import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import '../../pages/Home/Home.scss';
import WorkoutItem from '../../assets/Workout-item.svg';
import LogIcon from '../../assets/Log-icon.svg';

const Home = () => {
  const navigate = useNavigate();

  const handleStartWorkoutClick = () => {
    navigate('/start-workout');
  };

  const handleLogClick = () => {
    navigate('/logs');
  };

  return (
    <div className="div-page">  
      <div className="home-section">
        <Header
          variant={'phoneL'}
          title='Homepage'
          paragraph={'Track your workouts, monitor progress, and achieve your fitness goals with SMARTFIT.'
          }
        />

        <div className="button-group">
          <Button
            icon= {WorkoutItem}
            label="Start Workout"
            onClick={handleStartWorkoutClick}
            variant="orange"
          />
          <Button
            icon= {LogIcon}
            label="Logs"
            onClick={handleLogClick}
            variant="blue"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;