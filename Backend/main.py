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

# Load the trained models
model = tf.keras.models.load_model('model/exercise30n+-1.keras')
yolo_model = YOLO('model/best.pt')
class_names = yolo_model.names  # This retrieves the class names dictionary
print(model.summary())

class_names_to_weight = {
    "0":10,
    "1":5,
    "2":0
}
print("Model Input Shape:", model.input_shape)

actions = np.array(['nothing', 'deadlift-s', 'deadlift-c', 'squat-s', 'squat-c'])

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_demo_data():
    with open("testdata.json", "r") as f:
        return json.load(f)

def preprocess_landmarks(landmarks):
    # Flatten the 33 landmarks, each having (x, y, z) coordinates
    print(len(landmarks))
    frame = []
    for landmark in landmarks:
        frame.extend([landmark["x"], landmark["y"], landmark["z"]])
    return np.array(frame)


def predict_workout_from_landmarks(landmarks):

    return

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


#landmark for one single frame i.e 33 landmarks
def predict_workout_by_landmarks(landmarks):
    import random
    return random.choice(["squat-c","squat-s","none"])

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
    
    # Create a dictionary to manually count occurrences
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1  # Increment count for each item
    
    # Find the maximum frequency
    max_count = max(counts.values())
    
    # Return all items with the maximum frequency
    most_recurring_items = [item for item, freq in counts.items() if freq == max_count]
    
    return most_recurring_items[0]

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
        #payload = get_demo_data()
        all_landmarks = payload["mediapipeLogs"]
        all_frames = payload["frames"]
        all_frames_images = [frame["base64Image"] for frame in all_frames]
        all_frame_landmarks = [frame["landmarks"] for frame in all_landmarks]

        frame_data = [preprocess_landmarks(frame) for frame in all_frame_landmarks]

        #sequence = frame_data

        #test_frme= all_frames[0]["base64Image"]

        #llm_prediction = groq_llm_prediction_img(test_frme)

        # Use multithreading to process frames
        with ThreadPoolExecutor() as executor:
            weight_prediction_results = list(executor.map(process_weight_prediction, all_frames_images))

        with ThreadPoolExecutor() as executor:
            workout_prediction_results = list(executor.map(predict_workout_by_landmarks, all_frame_landmarks))

        
        
        total_reps=   process_positions(workout_prediction_results)
        # Map results back to frames
        response = {
           
            "total_weight": (process_weights(weight_prediction_results))[-1],
            "total_reps":len(total_reps) // 2,
            "workout":most_recurring(workout_prediction_results),
        }
        return jsonify(response)
    
    except Exception as e:
        
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
