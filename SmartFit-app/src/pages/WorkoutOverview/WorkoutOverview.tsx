import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import LogIcon from '../../assets/Log-icon.svg';
import LogOverview from '../../components/LogOverview/LogOverview';
import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader';
import ExerciseRow from '../../components/ExerciseRow/ExerciseRow';
import '../../pages/WorkoutOverview/WorkoutOverview.scss';
import ErrorPrevention from '../../components/ErrorPrevention/ErrorPrevention';

const WorkoutOverview = () => {
  const [showErrorPrevention, setShowErrorPrevention] = useState(false);

  const handleHomeClick = () => {
    setShowErrorPrevention(true); 
  };

  const handleEdit = () => {
    console.log("Edit button clicked");
  };

  return (
    <div className="workout-page">
      {/* Mobile Layout */}
      <div className="mobile-layout">
        <div className="overview-section">
          <Header variant="phoneS" title="WORKOUT OVERVIEW" />
          <div className="log_overview">
            <LogOverview exercise="Squat" set={1} reps={10} weight="60kg" onEdit={() => {}} />
            <LogOverview exercise="Squat" set={2} reps={10} weight="65kg" onEdit={() => {}} />
            <LogOverview exercise="Squat" set={3} reps={8} weight="70kg" onEdit={() => {}} />
            <LogOverview exercise="Squat" set={4} reps={8} weight="70kg" onEdit={() => {}} />
            <LogOverview exercise="Squat" set={5} reps={6} weight="75kg" onEdit={() => {}} />
            <div className="buttonworkout-group">
              <Button icon={LogIcon} label="Log Workout" onClick={handleHomeClick} variant="orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="desktop-layout">
        <Header variant="phoneS" title="WORKOUT OVERVIEW" />
        <ExerciseHeader onEdit={handleEdit} />
        <ExerciseRow exercise="Squat" set={1} reps={10} weight="60kg" notes="Keep back straight" />
        <ExerciseRow exercise="Squat" set={2} reps={10} weight="65kg" notes="Good form" />
        <ExerciseRow exercise="Squat" set={3} reps={8} weight="70kg" notes="Watch knee alignment" />
        <ExerciseRow exercise="Squat" set={4} reps={8} weight="70kg" notes="Maintain depth" />
        <ExerciseRow exercise="Squat" set={5} reps={6} weight="75kg" notes="Final push" />
        <div className="buttonworkout-group">
           <Button icon={LogIcon} label="Log Workout" onClick={handleHomeClick} variant="orange" />
        </div>
      </div>
      {showErrorPrevention && (
        <ErrorPrevention
          text="Workout logged successfully!"
          type="success"
        />
      )}
    </div>
  );
};

export default WorkoutOverview;

