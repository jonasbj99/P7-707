from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import tensorflow as tf

import base64
from io import BytesIO
from PIL import Image
import supervision as sv

app = Flask(__name__)
CORS(app)

# Load the first model
exerciseModel = tf.keras.models.load_model('models/model1.keras')
actions = np.array(['unknown', 'deadlift-s', 'deadlift-c', 'squat-s', 'squat-c'])

# Load the second model
weightModel = tf.keras.models.load_model('models/object_detect.pt')
class_names = weightModel.names

# Route for the exercise prediction
@app.route('/exercise', methods=['POST'])
def exercise():
    try:
        data = request.get_json()
        input_data = np.array(data['input'])  
        prediction = exerciseModel.predict(input_data)

        return jsonify({'prediction': prediction.tolist()})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Route for the weight prediction
@app.route('/weight', methods=['POST'])
def weight():
    try:
        data = request.get_json()

        # Step 1: Extract the base64 string (remove the prefix part)
        image_data = data.split(",")[1]

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
        result = weightModel.predict(image_np, conf=0.8)[0]

        detections = sv.Detections.from_ultralytics(result)

        detection_data = {
            "confidence_scores": detections.confidence.tolist(),  # Confidence scores
            "class_ids": detections.class_id.tolist(),  # Class IDs
            "class_names": [class_names[class_id] for class_id in detections.class_id]  # Add class names

        }
        
        return jsonify({'prediction': result.tolist()})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True)