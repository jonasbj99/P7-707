import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

interface WorkoutItem {
    exercise: string;
    set: number;
    reps: number;
    weight: string;
    notes?: string;
  }


export const WorkoutLogs = atomWithStorage<WorkoutItem[]>('workoutlogs',[]);
export const SingleWorkoutLogs = atom<WorkoutItem>({exercise: '', set:0, reps:0, weight:'', notes: ''});
