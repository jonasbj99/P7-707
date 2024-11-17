import React, { useState } from 'react';
import '../../pages/WorkoutOverview/WorkoutOverview.scss';
import LogItems from '../../components/LogItems/LogItems';
import Button from '../../components/Button/Button';
import HomeIcon from '../../assets/Home-icon.svg';
import ErrorPrevention from '../../components/ErrorPrevention/ErrorPrevention';

interface WorkoutItem {
  exercise: string;
  set: number;
  reps: number;
  weight: string;
  notes?: string;
}

interface WorkoutOverviewProps {
  workoutData: WorkoutItem[];
}

const WorkoutOverview = ({ workoutData }: WorkoutOverviewProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleHomeClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="workout-overview">
      <h2>Workout Overview</h2>
      <LogItems workoutData={workoutData} />

      <div className="button-wrapper" >
        <Button
          icon={HomeIcon}
          label="HomePage"
          onClick={handleHomeClick}
          variant="orange"
        />
      </div>

      {showModal && (
        <ErrorPrevention
          text="You have successfully completed your workout!"
          type="success"
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default WorkoutOverview;
