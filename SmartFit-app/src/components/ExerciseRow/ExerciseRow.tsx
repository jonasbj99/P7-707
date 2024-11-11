
import React from 'react';
import styles from './ExerciseRow.module.scss';

interface ExerciseRowProps {
  exercise: string;
  set: number;
  reps: number;
  weight: string;
  notes: string;
}

function ExerciseRow({ exercise, set, reps, weight,notes }: ExerciseRowProps) {
  return (
    <div className={styles.ExerciseRow}>
      <span className={styles.exercise_name}>{exercise}</span>
      <span className={styles.exercise_set}>{set}</span>
      <span className={styles.exercise_reps}>{reps} reps</span>
      <span className={styles.exercise_weight}>{weight}</span>
      <span className={styles.exercise_notes}>{notes}</span>
    </div>
  );
}

export default ExerciseRow;
