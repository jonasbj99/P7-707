import React from 'react';
import styles from './LogOverview.module.scss';
import editIcon from '../../assets/Edit-icon.svg';

interface LogOverviewProps {
    exercise: string;
    set: number;
    reps: number;
    weight: string;
    onEdit: () => void;
}

function LogOverview({ exercise, set, reps, weight, onEdit }: LogOverviewProps) {
    return (
        <div className={styles.logCard}>
            <div className={styles.cardHeader}>
                <span className={styles.logTitle}>EXERCISE</span>
                <span className={styles.logName}>{exercise}</span>
                <button className={styles.logEdit} onClick={onEdit}>
                 <img src={editIcon} alt="Edit" className={styles.logEdit__icon} />
                 </button>
            </div>
            <div className={styles.exerciseDetails}>
                <div className={styles.exerciseDetail}>
                    <span className={styles.detailLabel}>SET</span>
                    <span className={styles.detailValue}>{set}</span>
                </div>
                <div className={styles.exerciseDetail}>
                    <span className={styles.detailLabel}>REPS</span>
                    <span className={styles.detailValue}>{reps}</span>
                </div>
                <div className={styles.exerciseDetail}>
                    <span className={styles.detailLabel}>WEIGHT</span>
                    <span className={styles.detailValue}>{weight}</span>
                </div>
            </div>
        </div>
    );
}

export default LogOverview;
