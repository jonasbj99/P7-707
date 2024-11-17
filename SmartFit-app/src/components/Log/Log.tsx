import React from 'react';
import styles from './Log.module.scss';
import editIcon from '../../assets/Edit-icon.svg';

interface LogProps {
  date: string;
  workoutName: string;
  destination?: string;
  onClick: () => void;
}

const Log = ({ date, workoutName, onClick }: LogProps) => {
  return (
    <div className={styles.logItem} onClick={onClick}>
      <span className={styles.logItem__date}>{date}</span>
      <span className={styles.logItem__name}>{workoutName}</span>
      <button className={styles.logItem__edit}>
        <img src={editIcon} alt="Edit" className={styles.logItem__icon} />
      </button>
    </div>
  );
};

export default Log;
