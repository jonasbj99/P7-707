import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import '../../pages/Home/Home.scss';
import PlayIcon from '../../assets/Play-icon.svg';
import NoIcon from '../../assets/No-icon.svg';

const CurrentWorkout = () => {
  const navigate = useNavigate();

  const handleStartRecordingClick = () => {
    navigate('/recording');
  };

  const handleEndClick = () => {
    navigate('/home');
  };

  return (
    <div className="div-page">  
      <div className="home-section">
        <Header
          variant={'phoneM'}
          title='Current workout'
          paragraph={'Start your new workout or check the ones you did before! Monitor your progress and improve idk'
          }
        />

        <div className="button-group">
          <Button
            icon= {PlayIcon}
            label="Start Recording"
            onClick={handleStartRecordingClick}
            variant="orange"
          />
          <Button
            icon= {NoIcon}
            label="End Workout"
            onClick={handleEndClick}
            variant="dark"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWorkout;
