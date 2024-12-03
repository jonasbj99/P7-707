import React, { useEffect, useRef, useState } from "react";
import * as mpPose from "@mediapipe/pose";
import * as drawingUtils from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import axios from "axios";
import { useAtom } from "jotai";
import { MediaFrame, MediaPipeLog, recordingLogsAtom } from "../../atom/response";

type PoseDetectionProps = {
  setLandmarkLogs: React.Dispatch<React.SetStateAction<mpPose.NormalizedLandmark[][]>>;
  firstFrame: string | null;
  setFirstFrame: React.Dispatch<React.SetStateAction<string>>;

};

const PoseDetection: React.FC<PoseDetectionProps> = ({ setLandmarkLogs, firstFrame, setFirstFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [landmarkSequence, setLandmarkSequence] = useState<mpPose.NormalizedLandmark[][]>([]);
  const [recordingLogs, setRecordingLogs] = useAtom(recordingLogsAtom);
  const [lastLoggedTime, setLastLoggedTime] = useState<number>(Date.now());

  const [recordingStartTime] = useState(() => Date.now());



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
    let lastLoggedSecond = -2; // Initialize to a value that ensures the first log is captured


    pose.onResults((results) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw the video feed
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Draw landmarks
      if (results.poseLandmarks) {
        drawingUtils.drawConnectors(ctx, results.poseLandmarks, mpPose.POSE_CONNECTIONS);
        drawingUtils.drawLandmarks(ctx, results.poseLandmarks);

        const currentTime = Date.now();
        const seconds = Math.floor((currentTime - recordingStartTime) / 1000);

        // Log every frame's landmarks
        const logData: MediaPipeLog = {
          second: seconds,
          landmarks: results.poseLandmarks,
        };

        setRecordingLogs((prevLogs) => ({
          ...prevLogs,
          mediapipeLogs: [...prevLogs.mediapipeLogs, logData],
        }));

        // Log frame data only every 2 seconds
        if (seconds >= lastLoggedSecond + 2) {
          const frameData: MediaFrame = {
            second: seconds,
            base64Image: canvas.toDataURL("image/png"), // Capture the current frame as a base64 image
          };

          setRecordingLogs((prevLogs) => ({
            ...prevLogs,
            frames: [...prevLogs.frames, frameData],
          }));

          lastLoggedSecond = seconds; // Update the last logged second
        }
      }
    });

    // Initialize webcam feed
    const camera = new Camera(videoRef.current!, {
      onFrame: async () => {



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
