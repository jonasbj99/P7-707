import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import '../../pages/Logs/Logs.scss';
import Log from '../../components/Log/Log';


const Logs = () => {
    const navigate = useNavigate();
  
    const handleLoadMoreClick = () => {
      navigate('/home');
    };

    return (
        <div className="logs-page">  
          <div className="logs-section">
            <Header
              variant={'phoneM'}
              title='Logs'
              paragraph={"Here you can see and edit all your past workouts"}
            />

             <div className="logs_overview">
            <Log date={'9.11.2024'} workoutName={'Workout 6'}/>
            <Log date={'8.11.2024'} workoutName={'Workout 5'}/>
            <Log date={'7.11.2024'} workoutName={'Workout 4'} />
            <Log date={'5.11.2024'} workoutName={'Workout 3'} />
            <Log date={'4.11.2024'} workoutName={'Workout 2'} />
            <Log date={'2.11.2024'} workoutName={'Workout 1'} />

            <div className="button-group">
              <Button
                label="Load More"
                onClick={handleLoadMoreClick}
                variant="orange"
              />
             
            </div>
          </div>
        </div>
        </div>
      );
    };
    
    export default Logs;