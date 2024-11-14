import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import '../../pages/Set/Set.scss';
import NoIcon from '../../assets/No-icon.svg';
import PlayIcon from '../../assets/Play-icon.svg';
import Suggestion from '../../components/Suggestion/Suggestion';
import SetOverview from '../../components/SetOverview/SetOvervie';

const Set = () => {
    const navigate = useNavigate();
  
    const handleStartRecordingClick = () => {
      navigate('/recording');
    };
  
    const handleEndClick = () => {
      navigate('/workoutoverview');
    };
  
    return (
      <div className="div-page">  
        <div className="setheader-section">
          <Header
            variant={'phoneS'}
            title='SET OVERVIEW'
          />
         <div className="suggestion">
          <Suggestion message={'Nice set! Next time try to go a little bit deeper or stretch more before the exercise for bigger range of motion.'}/>

          <div className="set_overview">
          <SetOverview exercise={'Squat'} reps={10} weight={55}/>

          <div className="set_button-group">
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
    </div>
 </div>
    );
  };
  
  export default Set;
  