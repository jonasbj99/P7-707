import React, { useEffect, useRef } from 'react';
import styles from './PoseDetection.module.scss'; // Assume you have a CSS module for styling
import * as mpPose from '@mediapipe/pose';
import * as drawingUtils from '@mediapipe/drawing_utils';
import { Camera } from '@mediapipe/camera_utils';

function PoseDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMounted = true;

    const pose = new mpPose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (!isMounted) return;

      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas && video) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          if (results.poseLandmarks) {
            drawingUtils.drawConnectors(ctx, results.poseLandmarks, mpPose.POSE_CONNECTIONS);
            drawingUtils.drawLandmarks(ctx, results.poseLandmarks);
          }
        }
      }
    });

    const camera = new Camera(videoRef.current!, {
      onFrame: async () => {
        if (isMounted) {
          await pose.send({ image: videoRef.current! });
        }
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      isMounted = false;
      pose.close();
      camera.stop();
    };
  }, []);

  return (
    <div className={styles.poseDetection}>
      <video ref={videoRef} className={styles.hiddenVideo} />
      <canvas ref={canvasRef} className={styles.canvas} width={640} height={480} />
    </div>
  );
}

export default PoseDetection;
