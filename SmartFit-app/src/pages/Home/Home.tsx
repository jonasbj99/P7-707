import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import '../../pages/Home/Home.scss';
import WorkoutIcon from '../../assets/Workout-icon.svg';
import LogIcon from '../../assets/Log-icon.svg';

const Home = () => {
  const navigate = useNavigate();

  const handleStartWorkoutClick = () => {
    navigate('/current-workout');
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
          paragraph={'Start your new workout or check the ones you did before! Monitor your progress and improve idk'
          }
        />

        <div className="button-group">
          <Button
            icon= {WorkoutIcon}
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