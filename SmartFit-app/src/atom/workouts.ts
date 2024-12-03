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
