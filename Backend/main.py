from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from flask_cors import CORS

# Load the trained model
model = tf.keras.models.load_model('model/action.h5')
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

    for frame in landmarks[:30]:  # Ensure max 30 frames
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

        return jsonify({
            'predicted_class': int(predicted_class),
            'confidence': float(confidence),
            'predicted_exercise': predicted_exercise,
            'all_probabilities': prediction[0].tolist(),
            'input_shape': list(processed_landmarks.shape)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)