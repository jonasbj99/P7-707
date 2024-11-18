import cv2
import mediapipe as mp
import pickle
import numpy as np

# Load the trained model
with open('C:\\Users\\Opstart\\Desktop\\PianoRat-403-P4-Ny\\P7-707\\MediaPipe\\MediaPipeTest\\pose_model.pkl', 'rb') as file:
    pose_model = pickle.load(file)

# Initialize MediaPipe for pose detection
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Set up video capture (0 is typically the default camera)
cap = cv2.VideoCapture(0)

# Check if the video capture is working
if not cap.isOpened():
    print("Error: Could not open video capture")
else:
    print("Video capture is working")

try:
    while cap.isOpened():
        ret, frame = cap.read()
        
        if not ret:
            print("Error: Failed to grab frame")
            break

        # Convert the image to RGB as MediaPipe expects RGB input
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image_rgb)

        # Check if any landmarks were detected
        if results.pose_landmarks:
            print("Landmarks detected")
            # Extract landmarks as a list of x, y, z, visibility
            landmarks = results.pose_landmarks.landmark
            pose_data = [landmark.x for landmark in landmarks] + \
                        [landmark.y for landmark in landmarks] + \
                        [landmark.z for landmark in landmarks] + \
                        [landmark.visibility for landmark in landmarks]
            
            # Convert to a 2D array to match model input
            X_new = np.array([pose_data])

            try:
                # Run inference with the trained model
                prediction = pose_model.predict(X_new)
                predicted_pose = prediction[0]  # Assuming model returns label

                # Display the predicted pose on the frame
                cv2.putText(frame, f'Predicted Pose: {predicted_pose}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            except Exception as e:
                print(f"Error during inference: {e}")

        else:
            print("No landmarks detected in this frame")

        # Display the video feed
        cv2.imshow('Pose Detection', frame)

        # Press 'q' to exit the loop
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

finally:
    # Release resources and close the window
    cap.release()
    cv2.destroyAllWindows()
    pose.close()
