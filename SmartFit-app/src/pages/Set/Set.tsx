import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import '../../pages/Set/Set.scss';
import NoIcon from '../../assets/No-icon.svg';
import PlayIcon from '../../assets/Play-icon.svg';
import Suggestion from '../../components/Suggestion/Suggestion';
import SetOverview from '../../components/SetOverview/SetOvervie';
import { useAtomValue } from 'jotai';
import { responseAtom } from '../../atom/response';
const Set = () => {
    const navigate = useNavigate();

    const lastResponse = useAtomValue(responseAtom);
  
    const handleStartRecordingClick = () => {
      navigate('/recording');
    };
  
    const handleEndClick = () => {
      navigate('/workoutoverview');
    };

    const weightPredictions = lastResponse?.weight_prediction;

// Check if weightPredictions exists and has class_names
const weights = weightPredictions?.class_names as string[] || [];

// Calculate the sum only if weights exist
const sum = weights.reduce((acc, weight) => {
  const numericValue = parseFloat(weight.replace(/kg/i, "")); // Remove 'kg' and parse as number
  return acc + (isNaN(numericValue) ? 0 : numericValue);
}, 0);

const totalWeights = sum;

    return (
      <div className="set_div-page">  
        <div className="setheader-section">
          <Header
            variant={'phoneS'}
            title='SET OVERVIEW'
          />
         <div className="suggestion">
          <Suggestion message={'Nice set! Next time try to go a little bit deeper or stretch more before the exercise for bigger range of motion.'}/>

          <div className="set_overview">
          <SetOverview exercise={lastResponse.predicted_exercise} reps={10} weight={totalWeights}/>

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
  