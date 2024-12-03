import { NormalizedLandmark } from '@mediapipe/pose'
import { atom } from 'jotai'


export const responseAtom = atom({
    'predicted_class': 0,
    'confidence': 0,
    'predicted_exercise': "",
    'all_probabilities': [],
    'input_shape': [],

    "weight_prediction": {
        "confidence_scores": [],
        "class_ids": [],
        "class_names": []
    }
})

export interface MediaPipeLog {
    second: number; // Timestamp in seconds
    landmarks: NormalizedLandmark[]; // Array of landmarks detected
}

// Represents a captured frame with its corresponding timestamp and image data
export interface MediaFrame {
    second: number; // Timestamp in seconds
    base64Image: string; // Base64-encoded image data
}

// Recording logs structure
export const recordingLogsAtom = atom({
    mediapipeLogs: [] as MediaPipeLog[], // Array of MediaPipe logs
    frames: [] as MediaFrame[], // Array of frame data
},);