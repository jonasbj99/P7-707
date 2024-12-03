import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './LogItems.module.scss';
import editIcon from '../../assets/Edit-icon.svg'; // Import the icon
import Header from '../Header/Header';

interface WorkoutItem {
  exercise: string;
  set: number;
  reps: number;
  weight: string;
  notes?: string;
}

interface LogItemsProps {
  workoutData: WorkoutItem[];
}

function LogItems({ workoutData }: LogItemsProps) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div className={styles.workoutOverview}>
      <Header
         variant={'phoneM'}
         title='Workout Overview'
        />

      <div className={styles.workoutTable}>
        {isDesktop ? (
          // Desktop layout with an icon in the header
          <div>
            <div className={styles.workoutHeader}>
              <span className={`${styles.column} ${styles.exercise}`}>Exercise</span>
              <span className={`${styles.column} ${styles.set}`}>Set</span>
              <span className={`${styles.column} ${styles.reps}`}>Rep count</span>
              <span className={`${styles.column} ${styles.weight}`}>Weight</span>
              <span className={`${styles.column} ${styles.notes}`}>Notes</span>
              <img src={editIcon} alt="Edit" className={styles.editIcon} /> {/* Use the imported icon */}
            </div>
            {workoutData.map((item, index) => (
              <div key={index} className={styles.workoutRow}>
                <span className={`${styles.column} ${styles.exercise}`}>
                  <button className={styles.exerciseButton}>{item.exercise?.split("-")[0]}</button>
                </span>
                <span className={`${styles.column} ${styles.set}`}>{item.set}</span>
                <span className={`${styles.column} ${styles.reps}`}>{item.reps} reps</span>
                <span className={`${styles.column} ${styles.weight}`}>{item.weight}</span>
                <span className={`${styles.column} ${styles.notes}`}>{item.notes || ""}</span>
              </div>
            ))}
          </div>
        ) : (
          // Mobile layout
          workoutData.map((item, index) => (
            <div key={index} className={styles.workoutItem}>
              <div className={styles.workoutHeader}>
                <span className={styles.label}>Exercise</span>
                <span className={styles.exerciseName}>{item.exercise}</span>
                <img src={editIcon} alt="Edit" className={styles.editIcon} /> {/* Use the imported icon */}
              </div>
              <div className={styles.workoutContent}>
                <div className={styles.workoutColumn}>
                  <span className={styles.label}>Set</span>
                  <span className={styles.value}>{item.set}</span>
                </div>
                <div className={styles.workoutColumn}>
                  <span className={styles.label}>Reps</span>
                  <span className={styles.value}>{item.reps}</span>
                </div>
                <div className={styles.workoutColumn}>
                  <span className={styles.label}>Weight</span>
                  <span className={styles.value}>{item.weight}</span>
                </div>
              </div>
              {item.notes && (
                <div className={styles.workoutNotes}>
                  <span className={styles.label}>Notes</span>
                  <span className={styles.value}>{item.notes}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LogItems;
