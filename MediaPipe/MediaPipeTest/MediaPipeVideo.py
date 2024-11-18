import cv2
import mediapipe as mp
import csv

def write_landmarks_to_csv(landmarks, frame_number, csv_data):
    print(f"Landmark coordinates for frame {frame_number}:")
    for idx, landmark in enumerate(landmarks):
        print(f"{mp_pose.PoseLandmark(idx).name}: (x: {landmark.x}, y: {landmark.y}, z: {landmark.z}, v: {landmark.visibility})")
        csv_data.append([frame_number, mp_pose.PoseLandmark(idx).name, landmark.x, landmark.y, landmark.z, landmark.visibility])
    print("\n")

#video_path = 'C:\\Users\\Opstart\\Desktop\\mpVid2.mp4'
#video_path = 'C:\\Users\\Opstart\\Desktop\\deadlift.mp4'
video_path = 'C:\\Users\\Opstart\\Desktop\\squad.mp4'
output_csv = 'C:\\Users\\Opstart\\Desktop\\xxx.csv'

# Initialize MediaPipe Pose and Drawing utilities
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose()

# Open the video file
cap = cv2.VideoCapture(video_path)

frame_number = 0
csv_data = []

# Set your confidence threshold for landmarks
confidence_threshold = 0.8

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Resize the frame to make it smaller (e.g., 50% of the original size)
    frame = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5)    

    # Convert the frame to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process the frame with MediaPipe Pose
    result = pose.process(frame_rgb)

    # Draw the pose landmarks on the frame
    #if result.pose_landmarks:
    #    mp_drawing.draw_landmarks(frame, result.pose_landmarks, mp_pose.POSE_CONNECTIONS)

         #Add the landmark coordinates to the list and print them
    #    write_landmarks_to_csv(result.pose_landmarks.landmark, frame_number, csv_data)


     #Check and draw only landmarks above the confidence threshold
    if result.pose_landmarks:
        landmarks_above_threshold = [
            landmark for landmark in result.pose_landmarks.landmark if landmark.visibility > confidence_threshold
        ]

        if landmarks_above_threshold:
            mp_drawing.draw_landmarks(frame, result.pose_landmarks, mp_pose.POSE_CONNECTIONS)


            # Check if the 'r' key is held down
            if cv2.waitKey(1) & 0xFF == ord('r'):
                # Record only landmarks with sufficient confidence
                write_landmarks_to_csv(landmarks_above_threshold, frame_number, csv_data)

    # Display the frame
    cv2.imshow('MediaPipe Pose', frame)

    frame_number += 1

    # Check if 'q' is pressed to exit
    key = cv2.waitKey(0) & 0xFF
    if key == ord('q'):
        break

# Write CSV data to a file after processing all frames
with open(output_csv, mode='w', newline='') as file:
    writer = csv.writer(file, delimiter=';')  # Explicitly specify comma as delimiter
    writer.writerow(["Frame", "Landmark", "X", "Y", "Z", "V"])  # Write header
    writer.writerows(csv_data)  # Write all rows


# Release resources
cap.release()
cv2.destroyAllWindows()