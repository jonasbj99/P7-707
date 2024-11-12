import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Log.module.scss';
import editIcon from '../../assets/Edit-icon.svg';

interface LogProps {
  date: string;
  workoutName: string;
  destination?: string; 
}

const Log = ({ date, workoutName }: LogProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/singleworkout'); 
  };

  return (
    <div className={styles.logItem}>
      <span className={styles.logItem__date}>{date}</span>
      <span className={styles.logItem__name}>{workoutName}</span>
      <button className={styles.logItem__edit} onClick={handleNavigation}>
        <img src={editIcon} alt="Edit" className={styles.logItem__icon} />
      </button>
    </div>
  );
};

export default Log;

