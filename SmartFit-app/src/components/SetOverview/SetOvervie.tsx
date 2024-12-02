import React from 'react';
import styles from './SetOverview.module.scss';

interface SetOverviewProps {
  exercise: string;
  reps: number;
  weight: number;
  note?: string;
}

export default function SetOverview(props: SetOverviewProps) {
  const { exercise, reps, weight, note } = props;

  return (
    <div className={styles.SetOverview}>
      <div className={styles.SetOverview_item}>
        <span className={styles.SetOverview_label}>Exercise</span>
        <span className={styles.SetOverview_value}>{exercise.split("-")[0]}</span>
      </div>
      <div className={styles.SetOverview_item}>
        <span className={styles.SetOverview_labelReps}>Reps</span>
        <span className={styles.SetOverview_value}>{reps}reps</span>
      </div>
      <div className={styles.SetOverview_item}>
        <span className={styles.SetOverview_label}>Weight</span>
        <span className={styles.SetOverview_value}>{weight}kg</span>
      </div>
      <div className={styles.SetOverview_note}>
        <span>{note || 'Add note'}</span>
      </div>
    </div>
  );
}
