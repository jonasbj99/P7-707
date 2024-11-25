import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../../components/Header/Header';
import Log from '../../components/Log/Log';
import LogItems from '../../components/LogItems/LogItems';
import '../../pages/Logs/Logs.scss';

interface Workout {
  id: number;
  date: string;
  workoutName: string;
  data: Array<{
    exercise: string;
    set: number;
    reps: number;
    weight: string;
    notes?: string;
  }>;
}

const Logs = () => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null); // Track selected workout by ID
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  const workouts: Workout[] = [
    {
      id: 1,
      date: '9.11.2024',
      workoutName: 'Workout 6',
      data: [
        { exercise: 'Squat', set: 3, reps: 12, weight: '100kg', notes: 'Good form' },
        { exercise: 'Deadlift', set: 4, reps: 8, weight: '150kg', notes: '' },
      ],
    },
    {
      id: 2,
      date: '8.11.2024',
      workoutName: 'Workout 5',
      data: [{ exercise: 'Squat', set: 3, reps: 10, weight: '80kg', notes: 'Need spotter' }],
    },
    {
      id: 3,
      date: '7.11.2024',
      workoutName: 'Workout 4',
      data: [{ exercise: 'Deadlift', set: 4, reps: 12, weight: '10kg', notes: '' }],
    },
  ];

  const handleLogClick = (id: number) => {
    setSelectedWorkoutId((prev) => (prev === id ? null : id)); // Toggle the workout details
  };

  return (
    <div className="logs-container">
      <div className="logs-section">
        <div className="logs-header">
          <Header
            variant={'phoneM'}
            title="Logs"
            paragraph="Here you can see and edit all your past workouts"
          />
        </div>
        {workouts.map((workout) => (
          <div key={workout.id} className="log-item-container">
            <Log
              date={workout.date}
              workoutName={workout.workoutName}
              onClick={() => handleLogClick(workout.id)}
            />
            {!isDesktop && selectedWorkoutId === workout.id && (
              <div className="mobile-overview">
                <LogItems workoutData={workout.data} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop */}
      {isDesktop && (
        <div className="workout-overview-section">
          {selectedWorkoutId ? (
            <LogItems
              workoutData={workouts.find((workout) => workout.id === selectedWorkoutId)?.data || []}
            />
          ) : (
            <div className="placeholder">Select a workout to view details</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logs;
