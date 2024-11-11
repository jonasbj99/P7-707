
import React from 'react';
import styles from './ExerciseHeader.module.scss';
import editIcon from '../../assets/Edit-icon.svg';


interface ExerciseHeaderProps {
    onEdit: () => void;
}

function ExerciseHeader({onEdit }: ExerciseHeaderProps) {
  return (
    <div className={styles.ExerciseHeader}>
      <span className={styles.header_exercise}>Exercise</span>
      <span className={styles.header_title}>Set</span>
      <span className={styles.header_title}>Rep count</span>
      <span className={styles.header_title}>Weight</span>
      <span className={styles.header_title}>Notes</span>
      <button className={styles.header_edit} onClick={onEdit}>
     <img src={editIcon} alt="Edit" className={styles.headerEdit__icon} />
     </button>
    </div>
  );
}

export default ExerciseHeader;
