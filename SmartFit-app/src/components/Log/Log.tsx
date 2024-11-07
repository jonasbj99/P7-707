
import React from 'react';
import styles from './Log.module.scss';
import editIcon from '../assets/edit-icon.svg'

interface LogProps {
  date: string;
  workoutName: string;
  onEdit: () => void;
}

const Log = ({ date, workoutName, onEdit }: LogProps) => {
  return (
    <div className={styles.logItem}>
      <span className={styles.logItem__date}>{date}</span>
      <span className={styles.logItem__name}>{workoutName}</span>
      <button className={styles.logItem__edit} onClick={onEdit}>
        <img src={editIcon} alt="Edit" className={styles.logItem__icon} />
      </button>
    </div>
  );
};

export default Log;
