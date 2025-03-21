from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from flask_cors import CORS
from ultralytics import YOLO
import base64
from io import BytesIO
from PIL import Image
import json
import supervision as sv
from concurrent.futures import ThreadPoolExecutor
import requests
from counter import ExerciseRepetitionCounter

# Load the trained models
model = tf.keras.models.load_model('model/exercise30n+.keras')
yolo_model = YOLO('model/best.pt')
class_names = yolo_model.names  # This retrieves the class names dictionary
print(model.summary())


class_names_to_weight = {
    "0":10,
    "1":5,
    "2":0
}

class_names_to_workout = {
    0:"nothing",
    1:"deadlift-s",
    2:"deadlift-c",
    3:"squat-s",
    4:"squat-c",
}

actions = np.array(['nothing', 'deadlift-s', 'deadlift-c', 'squat-s', 'squat-c'])

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_demo_data():
    with open("testdata.json", "r") as f:
        return json.load(f)




def process_weight_prediction(base_64_image_string):

    # Step 1: Extract the base64 string (remove the prefix part)
    image_data = base_64_image_string.split("data:image/png;base64,")[1]

    # Step 2: Decode the base64 string to raw image bytes
    image_bytes = base64.b64decode(image_data)

    # Step 3: Convert bytes into an image
    image = Image.open(BytesIO(image_bytes))
    image = image.convert("RGB")
    image.save("test.png")

    # Step 4: Convert the PIL image to a NumPy array (for use with most ML models)
    image_np = np.array(image)

   
    result = yolo_model.predict(image_np, conf=0.75)[0]

    

    detections = sv.Detections.from_ultralytics(result)

    box_annotator = sv.BoxAnnotator()
    label_annotator = sv.LabelAnnotator(text_color=sv.Color.BLACK)

    annotated_image = image.copy()
    annotated_image = box_annotator.annotate(annotated_image, detections=detections)
    annotated_image = label_annotator.annotate(annotated_image, detections=detections)
    annotated_image.save("test_annoted.png")

    detection_data = {
       
        "confidence_scores": detections.confidence.tolist(),  # Confidence scores
        "class_ids": detections.class_id.tolist(),  # Class IDs
       
        "class_names": [class_names[class_id] for class_id in detections.class_id],  # Add class names
        "formatted_weights":[class_names_to_weight[str(class_id)] for class_id in detections.class_id],

    }

    return detection_data

def process_weights(data):
    # Step 1: Initialize a set to store unique weights
    unique_weights = set()

    # Step 2: Loop through each frame prediction
    for frame in data:
        # Check if 'formatted_weights' has 2 or more elements
        if len(frame['formatted_weights']) >= 2:
            # Add weights to the set (set automatically handles uniqueness)
            unique_weights.update(frame['formatted_weights'])

    # Step 3: Calculate the total weight (sum of unique weights)
    total_weight = sum(unique_weights)

    return unique_weights, total_weight




def process_positions(frames):
    # Filter out irrelevant positions (keep only items ending in -s or -c)
    filtered_frames = [frame for frame in frames if frame.endswith("-s") or frame.endswith("-c")]
    
    # Remove consecutive duplicates
    processed_frames = []
    for frame in filtered_frames:
        if not processed_frames or processed_frames[-1] != frame:
            processed_frames.append(frame)
    
    # Map positions dynamically to up or down based on the suffix
    result = ["up" if pos.endswith("-s") else "down" for pos in processed_frames]
    
    return result

def most_recurring(items):
    if not items:  # Handle empty list
        return None

    # Count occurrences of each item
    counts = {}
    for item in items:
        # Skip counting "nothing"
        if item != "nothing":
            counts[item] = counts.get(item, 0) + 1

    if not counts:  # If no non-"nothing" items exist
        return "nothing"

    # Find the most recurring non-"nothing" item
    max_count = max(counts.values())
    most_recurring_items = [item for item, count in counts.items() if count == max_count]
    
    # If multiple items have the same max count, return the first one
    return most_recurring_items[0]
def process_chunk_landmarks(landmarks):
    processed_landmarks = []

    for frame in landmarks:  # Ensure max 30 frames
        frame_landmarks = []

        for landmark in frame[:33]:  # Use only the first 25 landmarks
            frame_landmarks.extend([
                landmark.get('x', 0.0),
                landmark.get('y', 0.0),
                landmark.get('z', 0.0),
            ])
            

        # Ensure each frame is flattened into a single array of 99 features
        frame_landmarks = np.array(frame_landmarks, dtype=np.float32)
        processed_landmarks.append(frame_landmarks[:99])  # Trim to 99 features


    # Ensure exactly 30 frames (pad with zeros if fewer)
    while len(processed_landmarks) < 30:
        processed_landmarks.append(np.zeros(99, dtype=np.float32))

    processed_landmarks = np.array(processed_landmarks, dtype=np.float32)
    print("Processed landmarks array shape:", processed_landmarks.shape)

    # Add batch dimension for model input
    processed_landmarks = np.expand_dims(processed_landmarks, axis=0)  # (1, 30, 99)
    print("Final input shape for model:", processed_landmarks.shape)
    return processed_landmarks


def predict_30_frame_landmark(landmarks):
    processed_landmarks = process_chunk_landmarks(landmarks)
    prediction = model.predict(processed_landmarks)
    predicted_class_index = int(prediction.argmax(axis=1)[0])  # Get the index of the max value

    
    return class_names_to_workout.get(predicted_class_index, "Unknown Class") 


@app.route('/predict', methods=['POST', 'OPTIONS', 'GET'])
def predict():
    if request.method == 'OPTIONS':
        response = jsonify(success=True)
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    try:
        # Get the data (for now using demo data)

        payload = request.get_json()
        # payload = get_demo_data()
        all_landmarks = payload["mediapipeLogs"]
        all_frames = payload["frames"]


        all_frames_images = [frame["base64Image"] for frame in all_frames]
        all_frame_landmarks = [frame["landmarks"] for frame in all_landmarks]

        
        # Group flattened_landmarks into chunks of 30 frames
        chunked_landmarks = [all_frame_landmarks[i:i+30] for i in range(0, len(all_frame_landmarks), 30)]

   
        

        # Use multithreading to process frames
        with ThreadPoolExecutor() as executor:
            weight_prediction_results = list(executor.map(process_weight_prediction, all_frames_images))

        with ThreadPoolExecutor() as executor:
            workout_prediction_results = list(executor.map(predict_30_frame_landmark, chunked_landmarks))

        
        #print(workout_prediction_results)
        
        most_recurring_workout = most_recurring(workout_prediction_results)
        #print("most_recurring",most_recurring(workout_prediction_results))
        counter = ExerciseRepetitionCounter()

        for workout in workout_prediction_results:

                counter.update_state(workout)

        #only keep the most detected_workout
        workout_prediction_results_filtered= [workout for workout in workout_prediction_results if workout == most_recurring_workout]

        #calculate the reps for most detected workout
        total_reps = process_positions(workout_prediction_results_filtered)




        

        response = {
           
            "total_weight": (process_weights(weight_prediction_results))[-1],
            "total_reps":counter.get_the_most_rep_count(),
            "workout": most_recurring(workout_prediction_results),
            "prediction":workout_prediction_results,
            "squat-reps":counter.get_count('squat'),
            "deadlift-reps":counter.get_count('deadlift')

        }
        return jsonify(response)
    
    except Exception as e:
        raise Exception(e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
