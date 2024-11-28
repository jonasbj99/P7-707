import React, { useEffect, useRef,useState } from "react";
import * as mpPose from "@mediapipe/pose";
import * as drawingUtils from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import axios from "axios"; 



type PoseDetectionProps = {
  setLandmarkLogs: React.Dispatch<React.SetStateAction<mpPose.NormalizedLandmark[][]>>;
  firstFrame:string | null;
  setFirstFrame: React.Dispatch<React.SetStateAction<string>>;
  


};

const PoseDetection: React.FC<PoseDetectionProps> = ({ setLandmarkLogs,firstFrame,setFirstFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [landmarkSequence, setLandmarkSequence] = useState<mpPose.NormalizedLandmark[][]>([]);

 // Prepare landmarks for backend prediction
 const prepareLandmarksForBackend = (landmarks: mpPose.NormalizedLandmark[]) => {
  return landmarks.map(landmark => ({
    visibility: landmark.visibility || 0.0,
    x: landmark.x || 0.0,
    y: landmark.y || 0.0,
    z: landmark.z || 0.0,
  }));
};

 //  Sending landmarks to backend for prediction
 const sendLandmarksToPrediction = async (landmarks: mpPose.NormalizedLandmark[][]) => {
  // Only sending if we have enough frames 
  if (landmarks.length < 5) return;

  try {
    // Take the last 5 frames for prediction
    const landmarksToSend = landmarks.slice(-5).map(prepareLandmarksForBackend);

    const response = await axios.post('http://127.0.0.1:5001/predict', {
      landmarks: landmarksToSend
    });

    console.log('Prediction:', response.data);
  } catch (error) {
    console.error('Prediction error:', error);
  }
};

  useEffect(() => {
    // Initialize MediaPipe Pose
    const pose = new mpPose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      //console.log(canvas.width)

      // Draw the video feed
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Draw landmarks
      if (results.poseLandmarks) {
        //console.log(results.poseLandmarks);
        
        drawingUtils.drawConnectors(ctx, results.poseLandmarks, mpPose.POSE_CONNECTIONS);
        drawingUtils.drawLandmarks(ctx, results.poseLandmarks);

         // [CHANGE] Keep existing landmark logging
         setLandmarkLogs((prevLogs) => [...prevLogs, results.poseLandmarks]);
        
         // [CHANGE] NEW: Update landmark sequence for prediction
         setLandmarkSequence((prevSequence) => {
           // Keep only last 10 frames to prevent memory issues
           const updatedSequence = [...prevSequence, results.poseLandmarks].slice(-10);
           return updatedSequence;
         });
        
        // setLandmarkLogs((prevLogs) => [...prevLogs, results.poseLandmarks]);

      }
    });

    // Initialize webcam feed
    const camera = new Camera(videoRef.current!, {
      onFrame: async () => {

        if (!firstFrame) {
          // Capture the first frame once the camera starts
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (context && videoRef.current) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            
            // Convert the frame to a Blob (can be used for uploading)
            const base64Image = canvas.toDataURL('image/jpeg');
            
            // Set the Base64 image to state
            setFirstFrame(base64Image);
          }
        }

        await pose.send({ image: videoRef.current! });
      },
      
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      pose.close();
    };
  }, []);

  return (
    <div>
      
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} width={640} height={480} />
    </div>
  );
};

export default PoseDetection;
