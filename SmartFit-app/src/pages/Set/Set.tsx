import React, { useEffect, useState } from 'react';
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
import { recordingLogsAtom } from '../../atom/response';
const Set = () => {
  const navigate = useNavigate();

  const lastResponse = useAtomValue(responseAtom);
  const recordingLogs = useAtomValue(recordingLogsAtom);
  const [isPredicting, setIsPredicting] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({
    "total_reps": 0,
    "total_weight": 0,
    "workout": "none"
  })


  const handleStartRecordingClick = () => {
    navigate('/recording');
  };

  const handleEndClick = () => {
    navigate('/workoutoverview');
  };


  useEffect(() => {

    async function getPrediction() {

      try {
        setIsPredicting(true);

        const resp = await fetch("http://127.0.0.1:5001/predict", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recordingLogs)
        })
        const data = await resp.json();

        setResponse(data);

        setIsPredicting(false);
      }
      catch (err) {
        setIsError(true)
      }




    }

    getPrediction()



  }, [])


  return (
    <div className="set_div-page">
      <div className="setheader-section">
        <Header
          variant={'phoneS'}
          title='SET OVERVIEW'
        />
        <div className="suggestion">
          <Suggestion message={'Nice set! Next time try to go a little bit deeper or stretch more before the exercise for bigger range of motion.'} />

          <div className="set_overview">

            {!isPredicting && !isError &&
              <SetOverview exercise={response.workout} reps={response.total_reps} weight={response.total_weight} />
                
            }

            {isPredicting && <p className='text-center'>Hold tight , we are generating results....</p>}

            <div className="set_button-group">
              <Button
                icon={PlayIcon}
                label="Start Recording"
                onClick={handleStartRecordingClick}
                variant="orange"
              />
              <Button
                icon={NoIcon}
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
