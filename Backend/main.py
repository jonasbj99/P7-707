from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from flask_cors import CORS
from ultralytics import YOLO
import base64
from io import BytesIO
from PIL import Image
import json

# Load the trained model
model = tf.keras.models.load_model('model/exercise30n.keras')
yolo_model = YOLO('model/object_detect.pt')
class_names = yolo_model.names  # This retrieves the class names dictionary


print("Model Input Shape:", model.input_shape)

actions = np.array(['nothing', 'deadlift-s', 'deadlift-c', 'squat-s', 'squat-c'])

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def process_landmarks(landmarks):
    """
    Process landmarks from frontend to match model input requirements.

    Args:
    landmarks (list): Landmark data from frontend

    Returns:
    numpy.ndarray: Processed landmark data for model prediction
    """
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

def process_weight_prediction(base_64_image_string):
    import supervision as sv


    # Step 1: Extract the base64 string (remove the prefix part)
    image_data = base_64_image_string.split(",")[1]

    # Step 2: Decode the base64 string to raw image bytes
    image_bytes = base64.b64decode(image_data)

    # Step 3: Convert bytes into an image
    image = Image.open(BytesIO(image_bytes))
    image.save("test.png")

    # Step 4: Convert the PIL image to a NumPy array (for use with most ML models)
    image_np = np.array(image)

    # Step 5: If needed, convert the image to the appropriate format (e.g., resize, normalize, etc.)
    # For example, if the model expects the image in a specific format or shape, we can process it here
    # Here, let's assume the model expects the image to be (height, width, channels), e.g., (224, 224, 3)
    #image_resized = image.resize((224, 224))
    #image_np = np.array(image_resized)
    result = yolo_model.predict(image_np, conf=0.8)[0]

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
        "class_names": [class_names[class_id] for class_id in detections.class_id]  # Add class names

    }

    return detection_data

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        response = jsonify(success=True)
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    
    try:
        payload = request.get_json()
        
        if 'landmarks' not in payload:
            return jsonify({'error': 'No landmarks provided'}), 400
        
        if 'firstFrame' not in payload:
            return jsonify({'error': 'No Frame provided'}), 400
        
        landmarks = payload['landmarks']
        
        if not landmarks or not isinstance(landmarks, list):
            return jsonify({'error': 'Invalid landmarks format'}), 400
        
        # Process landmarks and predict
        processed_landmarks = process_landmarks(landmarks)
        prediction = model.predict(processed_landmarks)
        
        # Debug: Print full prediction probabilities
        print("Full Prediction Probabilities:", prediction[0])
        
        # Extract prediction results
        predicted_class = np.argmax(prediction, axis=1)[0]
        
        confidence = prediction[0][predicted_class]
        predicted_exercise = actions[predicted_class]


        weight_prediction = process_weight_prediction(payload["firstFrame"])
        
        return jsonify({
            'predicted_class': int(predicted_class),
            'confidence': float(confidence),
            'predicted_exercise': predicted_exercise,
            'all_probabilities': prediction[0].tolist(),
            'input_shape': list(processed_landmarks.shape),
            "weight_prediction":weight_prediction,
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)